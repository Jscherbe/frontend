# Vue Switch Component Planning Notes

This document outlines the design and implementation plan for the Vue component wrapper of the `@ulu/frontend` switch component.

## Naming & Terminology

We will refer to the two switch styles as:
1. **Single Switch**: A classic on/off toggle switch. Maps to the `.switch` class (wraps a checkbox or toggle button).
2. **Switch Group** (or **Segmented Switch Group**): A container for selecting one of multiple options. Maps directly to the `.switch--group` modifier class and targets `.switch__item` children.

---

## Architectural Approach: Vue Composable (`useSwitchPositioning`)

To maximize flexibility, we recommend extracting the sliding indicator logic into a **Vue Composable** (`useSwitchPositioning`). 

Since switch groups can be implemented differently depending on the context (e.g., a native form radio group, a list of toggle checkboxes, or an ARIA-compliant tablist using Headless UI), a composable lets developers reuse the indicator positioning logic regardless of the markup structure.

### 1. The Composable (`useSwitchPositioning.js`)

This composable manages the `ResizeObserver`, listens to value changes, measures DOM Rects, and computes the required custom properties for CSS transition.

```javascript
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from "vue";

/**
 * Reusable composable to position the switch sliding background indicator.
 * @param {Ref<HTMLElement>} containerRef - Ref to the parent switch group container.
 * @param {Ref<Array<HTMLElement>>} itemRefs - Ref containing the array of item elements.
 * @param {Ref<number>|Function} activeIndex - Ref or getter function returning the active item index.
 * @returns {object} { indicatorStyles, updatePosition }
 */
export function useSwitchPositioning(containerRef, itemRefs, activeIndex) {
  const indicatorWidth = ref(0);
  const indicatorHeight = ref(0);
  const indicatorLeft = ref(0);
  const indicatorTop = ref(0);
  const indicatorOpacity = ref(0);

  // Return style bindings for the container or indicator
  const indicatorStyles = computed(() => ({
    "--ulu-switch-indicator-width": `${ indicatorWidth.value }px`,
    "--ulu-switch-indicator-height": `${ indicatorHeight.value }px`,
    "--ulu-switch-indicator-left": `${ indicatorLeft.value }px`,
    "--ulu-switch-indicator-top": `${ indicatorTop.value }px`,
    "--ulu-switch-indicator-opacity": indicatorOpacity.value
  }));

  const updatePosition = async () => {
    await nextTick();
    const container = containerRef.value;
    const items = itemRefs.value;
    const index = typeof activeIndex === "function" ? activeIndex() : activeIndex.value;

    if (!container || !items || index === -1 || !items[index]) {
      indicatorOpacity.value = 0;
      return;
    }

    const containerRect = container.getBoundingClientRect();
    // Resolve ref wrapper if array contains DOM nodes or Vue components
    const activeElement = items[index].$el || items[index];
    if (!activeElement || typeof activeElement.getBoundingClientRect !== "function") {
      indicatorOpacity.value = 0;
      return;
    }
    
    const activeRect = activeElement.getBoundingClientRect();

    indicatorLeft.value = activeRect.left - containerRect.left;
    indicatorTop.value = activeRect.top - containerRect.top;
    indicatorWidth.value = activeRect.width;
    indicatorHeight.value = activeRect.height;
    indicatorOpacity.value = 1;
  };

  let resizeObserver = null;

  onMounted(() => {
    updatePosition();
    if (typeof ResizeObserver !== "undefined" && containerRef.value) {
      resizeObserver = new ResizeObserver(updatePosition);
      resizeObserver.observe(containerRef.value);
    }
  });

  onBeforeUnmount(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  // Watch for activeIndex changes
  if (typeof activeIndex === "function") {
    watch(activeIndex, updatePosition);
  } else {
    watch(activeIndex, updatePosition);
  }

  return {
    indicatorStyles,
    updatePosition
  };
}
```

---

## Component Implementations

### 1. Single Switch Component (`UluSwitch.vue`)
A simple boolean toggle representing a checkbox. This is a pure-CSS template and requires **no JavaScript logic**.

```vue
<template>
  <label class="switch">
    <input 
      type="checkbox" 
      class="switch__input" 
      :checked="modelValue" 
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <span class="switch__control"></span>
    <span class="switch__label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      default: false
    }
  });
  defineEmits(["update:modelValue"]);
</script>
```

### 2. Switch Group Component (`UluSwitchGroup.vue`)
An implementation utilizing the new composable for radio-based groups.

```vue
<template>
  <div 
    ref="containerRef" 
    class="switch--group"
    :style="indicatorStyles"
  >
    <label 
      v-for="(option, index) in options" 
      :key="option.value"
      ref="itemRefs"
      class="switch__item"
      :class="{ 'is-active': modelValue === option.value }"
    >
      <input 
        type="radio" 
        :name="groupName" 
        :value="option.value"
        class="switch__input" 
        :checked="modelValue === option.value"
        @change="$emit('update:modelValue', option.value)"
      />
      <span class="switch__label">{{ option.label }}</span>
    </label>
    
    <div class="switch__indicator"></div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useSwitchPositioning } from "./useSwitchPositioning.js";

  const props = defineProps({
    modelValue: [String, Number, Boolean],
    options: {
      type: Array, // [{ label: 'Option A', value: 'a' }]
      required: true
    },
    groupName: {
      type: String,
      required: true
    }
  });

  defineEmits(["update:modelValue"]);

  const containerRef = ref(null);
  const itemRefs = ref([]);

  // Compute the active item index reactively
  const activeIndex = computed(() => {
    return props.options.findIndex(opt => opt.value === props.modelValue);
  });

  // Use the positioning composable
  const { indicatorStyles } = useSwitchPositioning(containerRef, itemRefs, activeIndex);
</script>
```

### 3. Headless UI Tablist Example
Using the exact same composable with custom component markup (e.g., Headless UI or custom Tab components).

```vue
<template>
  <TabGroup :value="selectedIndex" @change="$emit('update:value', $event)">
    <TabList ref="containerRef" class="switch--group" :style="indicatorStyles">
      <Tab 
        v-for="tab in tabs" 
        :key="tab"
        ref="itemRefs" 
        class="switch__item"
      >
        <span>{{ tab }}</span>
      </Tab>
      <div class="switch__indicator"></div>
    </TabList>
    <!-- TabPanels... -->
  </TabGroup>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { TabGroup, TabList, Tab } from "@headlessui/vue";
  import { useSwitchPositioning } from "./useSwitchPositioning.js";

  const props = defineProps({
    selectedIndex: Number,
    tabs: Array
  });

  const containerRef = ref(null);
  const itemRefs = ref([]);

  const activeIndex = computed(() => props.selectedIndex);
  const { indicatorStyles } = useSwitchPositioning(containerRef, itemRefs, activeIndex);
</script>
```
