let count = 0;

export default function(options) {
  const {
    percentage = 0,
    small = false,
    outside = false,
    outsideBelow = false,
    neutral = false,
    pieStyle = false,
    noMask = false
  } = options;

  const getStatusClass = () => {
    if (neutral) return '';
    if (percentage < 30) return 'progress-donut--low';
    if (percentage >= 30 && percentage < 100) return 'progress-donut--incomplete';
    if (percentage >= 100) return 'progress-donut--complete';
    return '';
  };
  //  Added the 1% extra to 100% because sometimes it renders with a tiny gap
  const normalize = (p) => (p === 100 ? 101 : p);
  const pieId = `ulu-progress-donut-pie-${ ++count }`;
  const showValueOutside = outside || outsideBelow || small;

  const classes = [
    'progress-donut',
    small ? 'progress-donut--small' : '',
    pieStyle ? 'progress-donut--pie' : '',
    showValueOutside ? 'progress-donut--outside' : '',
    outsideBelow ? 'progress-donut--outside-below' : '',
    noMask ? 'progress-donut--no-mask' : '',
    getStatusClass(),
  ].filter(Boolean).join(' ');
  
  return `
    <div class="${ classes }">
      <strong class="hidden-visually">Course Progress</strong>
      <div class="progress-donut__chart">
        <style type="text/css">
          #${ pieId } {
            animation-name: ${ pieId };
            animation-fill-mode: forwards;
          }
          @keyframes ${ pieId }  {
            from {
              stroke-dasharray: 0 100;
            }
            to {
              stroke-dasharray: ${ normalize(percentage) } 100;
            }
          }
        </style>
        <svg class="progress-donut__chart-svg" viewBox="0 0 32 32">
          <circle
            class="progress-donut__chart-track"
            r="16"
            cx="16"
            cy="16"
          />
          <circle
            id=${ pieId }
            class="progress-donut__chart-pie"
            r="16"
            cx="16"
            cy="16"
          />
          <circle
            class="progress-donut__chart-mask"
            cx="16"
            cy="16"
          />
        </svg>
        ${ !showValueOutside ? `<strong class="progress-donut__chart-value">${ percentage }%</strong>` : '' }
      </div>
      ${ showValueOutside ? `<strong class="progress-donut__value type-small-x">${ percentage }%</strong>` : ''}
    </div>
  `;
};
