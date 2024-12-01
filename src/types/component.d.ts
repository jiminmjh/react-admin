// //todo 假设你有两个组件 XtxSwiper 和 XtxGuess
// export const XtxSwiper: FC = () => {
//   return <div>XtxSwiper Component</div>;
// };

// export const XtxGuess: FC = () => {
//   return <div>XtxGuess Component</div>;
// };

// global.d.ts

// import { FC } from "react";
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       XtxSwiper: React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//       XtxGuess: React.DetailedHTMLProps<
//         React.HTMLAttributes<HTMLElement>,
//         HTMLElement
//       >;
//     }
//   }

//   export interface GlobalComponents {
//     XtxSwiper: FC;
//     XtxGuess: FC;
//   }
// }

// export type XtxSwiperInstance = React.ComponentType<typeof XtxSwiper>;
// export type XtxGuessInstance = React.ComponentType<typeof XtxGuess>;
