import { createUluEvent as i, dispatchCoreEvent as r, getCoreEventName as a, getUluEventName as o } from "./core/events.js";
import { getDefaultSettings as l, getSetting as n, getSettings as p, updateSetting as g, updateSettings as u, wrapSettingString as f } from "./core/settings.js";
import { ComponentInitializer as m } from "./core/component.js";
import { BreakpointManager as I } from "./ui/breakpoints.js";
import { Collapsible as z } from "./ui/collapsible.js";
import { init as D, initializer as C, setupGroup as v } from "./ui/details-group.js";
import { baseAttribute as T, closeAttribute as y, defaults as B, getDialogOptions as P, init as h, initializer as A, setDefaults as k, setupDialog as G, setupTrigger as L } from "./ui/dialog.js";
import { Flipcard as M, init as w, initializer as U } from "./ui/flipcard.js";
import { init as F, initializer as O } from "./ui/grid.js";
import { buildModal as N, defaults as R, init as W, initializer as K, setDefaults as j } from "./ui/modal-builder.js";
import { ProgrammaticModalManager as J } from "./ui/programmatic-modal.js";
import { OverflowScroller as X } from "./ui/overflow-scroller.js";
import { createPager as Z } from "./ui/overflow-scroller-pager.js";
import { init as $ } from "./ui/page.js";
import { Popover as te, getContentByTrigger as ie, init as re, initializer as ae, instances as oe, resolve as se } from "./ui/popover.js";
import { attrs as ne, init as pe } from "./ui/print-details.js";
import { init as ue } from "./ui/print.js";
import { attachHandlers as de, defaults as me, init as xe, initializer as Ie, setDefaults as ce, setupProxy as ze } from "./ui/proxy-click.js";
import { Resizer as De } from "./ui/resizer.js";
import { init as ve, initializer as be } from "./ui/scroll-slider.js";
import { Scrollpoint as ye, init as Be, initializer as Pe } from "./ui/scrollpoint.js";
import { Slider as Ae, init as ke, initializer as Ge, setupSlider as Le } from "./ui/slider.js";
import { TabManager as Me } from "./ui/tab-manager.js";
import { init as Ue, initializer as Ve, instances as Fe, setup as Oe } from "./ui/tabs.js";
import { defaults as Ne, init as Re, initializer as We, setDefaults as Ke, setupToggle as je } from "./ui/theme-toggle.js";
import { Tooltip as Je, init as Qe, initializer as Xe } from "./ui/tooltip.js";
import { log as Ze, logError as _e, logWarning as $e, set as et } from "./utils/class-logger.js";
import { dataAttributeToDatasetKey as it, resolveClasses as rt, setPositionClasses as at } from "./utils/dom.js";
import { FileSave as st } from "./utils/file-save.js";
import { createFloatingUi as nt, defaults as pt } from "./utils/floating-ui.js";
import { configureIcons as ut } from "./utils/font-awesome.js";
import { ensureId as dt, newId as mt } from "./utils/id.js";
import { pauseVideos as It, prepVideos as ct } from "./utils/pause-youtube-video.js";
export {
  I as BreakpointManager,
  z as Collapsible,
  m as ComponentInitializer,
  st as FileSave,
  M as Flipcard,
  X as OverflowScroller,
  te as Popover,
  J as ProgrammaticModalManager,
  De as Resizer,
  ye as Scrollpoint,
  Ae as Slider,
  Me as TabManager,
  Je as Tooltip,
  Ze as classLoggerLog,
  _e as classLoggerLogError,
  $e as classLoggerLogWarning,
  et as classLoggerSet,
  nt as createFloatingUi,
  i as createUluEvent,
  it as dataAttributeToDatasetKey,
  D as detailsGroupInit,
  C as detailsGroupInitializer,
  v as detailsGroupSetupGroup,
  T as dialogBaseAttribute,
  y as dialogCloseAttribute,
  B as dialogDefaults,
  P as dialogGetDialogOptions,
  h as dialogInit,
  A as dialogInitializer,
  k as dialogSetDefaults,
  G as dialogSetupDialog,
  L as dialogSetupTrigger,
  r as dispatchCoreEvent,
  dt as ensureId,
  w as flipcardInit,
  U as flipcardInitializer,
  pt as floatingUiDefaults,
  ut as fontAwesomeConfigureIcons,
  a as getCoreEventName,
  l as getDefaultSettings,
  n as getSetting,
  p as getSettings,
  o as getUluEventName,
  F as gridInit,
  O as gridInitializer,
  N as modalBuilderBuildModal,
  R as modalBuilderDefaults,
  W as modalBuilderInit,
  K as modalBuilderInitializer,
  j as modalBuilderSetDefaults,
  mt as newId,
  Z as overflowScrollerCreatePager,
  $ as pageInit,
  ie as popoverGetContentByTrigger,
  re as popoverInit,
  ae as popoverInitializer,
  oe as popoverInstances,
  se as popoverResolve,
  ne as printDetailsAttrs,
  pe as printDetailsInit,
  ue as printInit,
  de as proxyClickAttachHandlers,
  me as proxyClickDefaults,
  xe as proxyClickInit,
  Ie as proxyClickInitializer,
  ce as proxyClickSetDefaults,
  ze as proxyClickSetupProxy,
  rt as resolveClasses,
  ve as scrollSliderInit,
  be as scrollSliderInitializer,
  Be as scrollpointInit,
  Pe as scrollpointInitializer,
  at as setPositionClasses,
  ke as sliderInit,
  Ge as sliderInitializer,
  Le as sliderSetupSlider,
  Ue as tabsInit,
  Ve as tabsInitializer,
  Fe as tabsInstances,
  Oe as tabsSetup,
  Ne as themeToggleDefaults,
  Re as themeToggleInit,
  We as themeToggleInitializer,
  Ke as themeToggleSetDefaults,
  je as themeToggleSetupToggle,
  Qe as tooltipInit,
  Xe as tooltipInitializer,
  g as updateSetting,
  u as updateSettings,
  f as wrapSettingString,
  It as youtubePauseVideos,
  ct as youtubePrepVideos
};
