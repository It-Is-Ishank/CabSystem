import React from "react";

const Graph = ({shortestPath}) => {
  const { path } = shortestPath;

  // Function to determine if an edge should be highlighted
  const isHighlightedEdge = (node1, node2) => {
    if (!shortestPath || !shortestPath.path) {
      return false;
    }
    return shortestPath.path.includes(node1) && shortestPath.path.includes(node2);
  };
  return (
    <svg
      width="497"
      height="311"
      viewBox="0 0 497 311"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="svg">
        <path
          id="Line E-F"
          d="M352.5 267L400.561 211.336L448.622 155.673"
          stroke={isHighlightedEdge("E", "F") ? "yellow" : "black"}
        />
        <path id="Line C-D" d="M147 267L249.5 152L352 37" stroke={isHighlightedEdge("C", "D") ? "yellow" : "black"} />
        <line
          id="Line A-B"
          x1="51.6222"
          y1="136.673"
          x2="129.622"
          y2="46.6725"
          stroke={isHighlightedEdge("A", "B") ? "yellow" : "black"}
        />
        <line
          id="Line B-D"
          x1="145"
          y1="36.5"
          x2="351"
          y2="36.5"
          stroke={isHighlightedEdge("B", "D") ? "yellow" : "black"}
        />
        <line
          id="Line C-E"
          x1="157"
          y1="269.5"
          x2="363"
          y2="269.5"
          stroke={isHighlightedEdge("C", "E") ? "yellow" : "black"}
        />
        <path id="Line A-C" d="M135.5 260.5L42 156.5" stroke={isHighlightedEdge("A", "C") ? "yellow" : "black"} />
        <path id="Line D-F" d="M456.867 152L363.367 48" stroke={isHighlightedEdge("D", "F") ? "yellow" : "black"} />
        <path id="Line B-E" d="M348 267L145 37.5" stroke={isHighlightedEdge("B", "E") ? "yellow" : "black"} />
        <g id="Group A">
          <g id="Ellipse A" filter="url(#filter0_d_0_1)">
            <path
              d="M77 148.5C77 168.106 60.6584 184 40.5 184C20.3416 184 4 168.106 4 148.5C4 128.894 20.3416 113 40.5 113C60.6584 113 77 128.894 77 148.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="A"
            d="M35.358 156H33.5114L38.8523 141.455H40.6705L46.0114 156H44.1648L39.8182 143.756H39.7045L35.358 156ZM36.0398 150.318H43.483V151.881H36.0398V150.318Z"
            fill="black"
          />
        </g>
        <g id="Group B">
          <g id="Ellipse B" filter="url(#filter1_d_0_1)">
            <path
              d="M182 35.5C182 55.1061 165.658 71 145.5 71C125.342 71 109 55.1061 109 35.5C109 15.8939 125.342 0 145.5 0C165.658 0 182 15.8939 182 35.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="B"
            d="M139.761 43V28.4545H144.847C145.86 28.4545 146.696 28.6297 147.354 28.9801C148.012 29.3258 148.502 29.7921 148.824 30.3793C149.146 30.9616 149.307 31.608 149.307 32.3182C149.307 32.9432 149.196 33.4593 148.973 33.8665C148.755 34.2737 148.466 34.5956 148.107 34.8324C147.751 35.0691 147.366 35.2443 146.949 35.358V35.5C147.394 35.5284 147.841 35.6847 148.291 35.9688C148.741 36.2528 149.117 36.66 149.42 37.1903C149.723 37.7206 149.875 38.3693 149.875 39.1364C149.875 39.8655 149.709 40.5213 149.378 41.1037C149.046 41.6861 148.523 42.1477 147.808 42.4886C147.093 42.8295 146.163 43 145.017 43H139.761ZM141.523 41.4375H145.017C146.168 41.4375 146.984 41.215 147.467 40.7699C147.955 40.3201 148.199 39.7756 148.199 39.1364C148.199 38.6439 148.073 38.1894 147.822 37.7727C147.571 37.3513 147.214 37.0152 146.75 36.7642C146.286 36.5085 145.737 36.3807 145.102 36.3807H141.523V41.4375ZM141.523 34.8466H144.79C145.32 34.8466 145.798 34.7424 146.224 34.5341C146.655 34.3258 146.996 34.0322 147.247 33.6534C147.503 33.2746 147.631 32.8295 147.631 32.3182C147.631 31.679 147.408 31.1368 146.963 30.6918C146.518 30.242 145.813 30.017 144.847 30.017H141.523V34.8466Z"
            fill="black"
          />
        </g>
        <g id="Group C">
          <g id="Ellipse C" filter="url(#filter2_d_0_1)">
            <path
              d="M182 267.5C182 287.106 165.658 303 145.5 303C125.342 303 109 287.106 109 267.5C109 247.894 125.342 232 145.5 232C165.658 232 182 247.894 182 267.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="C"
            d="M151.466 263H149.705C149.6 262.493 149.418 262.048 149.158 261.665C148.902 261.281 148.589 260.959 148.22 260.699C147.856 260.434 147.451 260.235 147.006 260.102C146.561 259.97 146.097 259.903 145.614 259.903C144.733 259.903 143.935 260.126 143.22 260.571C142.51 261.016 141.944 261.672 141.523 262.538C141.106 263.405 140.898 264.468 140.898 265.727C140.898 266.987 141.106 268.05 141.523 268.916C141.944 269.783 142.51 270.438 143.22 270.884C143.935 271.329 144.733 271.551 145.614 271.551C146.097 271.551 146.561 271.485 147.006 271.352C147.451 271.22 147.856 271.023 148.22 270.763C148.589 270.498 148.902 270.173 149.158 269.79C149.418 269.402 149.6 268.956 149.705 268.455H151.466C151.333 269.198 151.092 269.863 150.741 270.45C150.391 271.037 149.955 271.537 149.435 271.949C148.914 272.356 148.329 272.666 147.68 272.879C147.036 273.092 146.348 273.199 145.614 273.199C144.373 273.199 143.27 272.896 142.304 272.29C141.338 271.684 140.578 270.822 140.024 269.705C139.47 268.587 139.193 267.261 139.193 265.727C139.193 264.193 139.47 262.867 140.024 261.75C140.578 260.633 141.338 259.771 142.304 259.165C143.27 258.559 144.373 258.256 145.614 258.256C146.348 258.256 147.036 258.362 147.68 258.575C148.329 258.788 148.914 259.101 149.435 259.513C149.955 259.92 150.391 260.417 150.741 261.004C151.092 261.587 151.333 262.252 151.466 263Z"
            fill="black"
          />
        </g>
        <g id="Group D">
          <g id="Ellipse D" filter="url(#filter3_d_0_1)">
            <path
              d="M388 35.5C388 55.1061 371.658 71 351.5 71C331.342 71 315 55.1061 315 35.5C315 15.8939 331.342 0 351.5 0C371.658 0 388 15.8939 388 35.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="D"
            d="M349.25 45H344.761V30.4545H349.449C350.86 30.4545 352.067 30.7457 353.071 31.3281C354.075 31.9058 354.844 32.7367 355.379 33.821C355.914 34.9006 356.182 36.1932 356.182 37.6989C356.182 39.214 355.912 40.5185 355.372 41.6122C354.832 42.7012 354.046 43.5393 353.014 44.1264C351.982 44.7088 350.727 45 349.25 45ZM346.523 43.4375H349.136C350.339 43.4375 351.336 43.2055 352.126 42.7415C352.917 42.2775 353.507 41.617 353.895 40.7599C354.283 39.9029 354.477 38.8826 354.477 37.6989C354.477 36.5246 354.286 35.5137 353.902 34.6662C353.518 33.8139 352.946 33.1605 352.183 32.706C351.421 32.2467 350.472 32.017 349.335 32.017H346.523V43.4375Z"
            fill="black"
          />
        </g>
        <g id="Group E">
          <g id="Ellipse E" filter="url(#filter4_d_0_1)">
            <path
              d="M388 267.5C388 287.106 371.658 303 351.5 303C331.342 303 315 287.106 315 267.5C315 247.894 331.342 232 351.5 232C371.658 232 388 247.894 388 267.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="E"
            d="M344.761 275V260.455H353.54V262.017H346.523V266.932H353.085V268.494H346.523V273.438H353.653V275H344.761Z"
            fill="black"
          />
        </g>
        <g id="Group F">
          <g id="Ellipse F" filter="url(#filter5_d_0_1)">
            <path
              d="M493 148.5C493 168.106 476.658 184 456.5 184C436.342 184 420 168.106 420 148.5C420 128.894 436.342 113 456.5 113C476.658 113 493 128.894 493 148.5Z"
              fill="#D9D9D9"
            />
          </g>
          <path
            id="F"
            d="M450.761 156V141.455H459.483V143.017H452.523V147.932H458.83V149.494H452.523V156H450.761Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d_0_1"
          x="0"
          y="113"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_0_1"
          x="105"
          y="0"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_0_1"
          x="105"
          y="232"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <filter
          id="filter3_d_0_1"
          x="311"
          y="0"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <filter
          id="filter4_d_0_1"
          x="311"
          y="232"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
        <filter
          id="filter5_d_0_1"
          x="416"
          y="113"
          width="81"
          height="79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_0_1"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_0_1"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Graph;
