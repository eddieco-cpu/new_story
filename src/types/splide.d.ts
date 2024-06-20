//### 方法三: 宣告 + @splidejs/splide (因為只有他有 export types) (@splidejs/react-splide 沒有) + 結合處理
//# 參考來源: self + gpt + read node_modules/@splidejs/(splide | react-splide)

// declare module "@splidejs/react-splide" {
//   import { FC, ReactNode } from "react";
//   import { Options as SplideOptions } from "@splidejs/splide";
//   import { DetailedHTMLProps, LiHTMLAttributes } from "react";

//   export interface SplideProps {
//     options?: SplideOptions;
//     children?: ReactNode;
//   }

//   export const Splide: FC<SplideProps>;
//   export const SplideSlide: FC<
//     DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
//   >;
// }

//new
declare module "@splidejs/react-splide" {
	import React from "react";
	import { Options } from "@splidejs/splide";

	export interface SplideProps {
		options?: Options;
		children?: ReactNode;
		hasTrack?: boolean;
		className?: string;
	}

	export const Splide: React.FC<SplideProps>;
	export const SplideSlide: React.FC<
		React.DetailedHTMLProps<
			React.LiHTMLAttributes<HTMLLIElement>,
			HTMLLIElement
		>
	>;
	export const SplideTrack: React.FC<
		React.DetailedHTMLProps<
			React.HTMLAttributes<HTMLDivElement>,
			HTMLDivElement
		>
	>;
}

//### 方法二: 宣告 + 簡單處理
//# 參考來源: chatgpt
// declare module '@splidejs/react-splide' {
//   import { ComponentType, ReactNode } from 'react';

//   export interface SplideProps {
//     options?: Record<string, any>; // 定義了 Splide 組件的 options 屬性，接受任何鍵值對
//     [key: string]: any; // 允許傳入任何額外的屬性
//   }

//   export const Splide: ComponentType<SplideProps>; // 定義 Splide 組件
//   export const SplideSlide: ComponentType<{ children?: ReactNode }>; // 定義 SplideSlide 組件，接受子節點
// }

//### 方法一: 純宣告，不處理
//# 參考來源: "https://github.com/Splidejs/react-splide/issues/12"
//declare module '@splidejs/react-splide';

/**
  1. 模組聲明 (declare module)：
    - declare module '@splidejs/react-splide' 聲明了一個名為 @splidejs/react-splide 的模組。這樣 TypeScript 編譯器就知道如何處理這個模組的導入。

  2. 導入 React 的類型 (import { ComponentType, ReactNode } from 'react')：
    - ComponentType 是一個泛型類型，用於描述 React 組件的類型。
    - ReactNode 是一個類型，可以描述任何可以作為 React 子節點的東西。

  3. 定義 SplideProps 接口：
    - SplideProps 接口定義了 Splide 組件的屬性。
    - options?: Record<string, any>：options 屬性是一個可選的對象，鍵和值可以是任何類型。
    - [key: string]: any：這是一個索引簽名，表示可以傳入任何其他屬性，鍵是字符串，值可以是任何類型。

  4. 定義 Splide 組件：
    - export const Splide: ComponentType<SplideProps>：聲明 Splide 組件，並指定它的屬性類型為 SplideProps。

  5. 定義 SplideSlide 組件：
    - export const SplideSlide: ComponentType<{ children?: ReactNode }>：聲明 SplideSlide 組件，並指定它接受一個可選的 children 屬性，該屬性類型為 ReactNode。
 */

/**
 * 如果我只寫這句話
 * declare module '@splidejs/react-splide';
 * 他也是過關的
 * 因為這樣的模組宣告告訴 TypeScript 編譯器存在這個模組，但不提供具體的型別定義。
 * 這種方法可以避免編譯錯誤，但你將失去型別檢查和自動補全功能。下面詳細解釋兩種方法的區別和使用場景。
 *
 * 1. 簡單模組宣告
 * 2. 詳細模組宣告
 */

/**
 * 1. 簡單模組宣告
 * declare module '@splidejs/react-splide';
 *
 * 優點：
 * 避免編譯錯誤：告訴 TypeScript 這個模組存在，可以防止導入模組時的編譯錯誤。
 * 簡單快速：不需要詳細了解模組的結構或型別，只需宣告模組存在。
 *
 * 缺點：
 * 失去型別檢查：無法使用模組提供的型別定義，失去了 TypeScript 的型別檢查功能。
 * 失去自動補全：無法使用模組提供的型別定義，失去了 IDE 的自動補全功能。
 */

/**
 * 2. 詳細模組宣告
 * declare module '@splidejs/react-splide' {
 *  import { ComponentType, ReactNode } from 'react';
 * export interface SplideProps {
 * options?: Record<string, any>;
 * [key: string]: any;
 * }
 * export const Splide: ComponentType<SplideProps>;
 * export const SplideSlide: ComponentType<{ children?: ReactNode }>;
 * }
 *
 * 優點：
 * 提供型別定義：可以使用模組提供的型別定義，享受 TypeScript 的型別檢查功能。
 * 自動補全：可以使用模組提供的型別定義，享受 IDE 的自動補全功能，能夠獲得自動補全和提示，提高開發效率。。
 *
 * 缺點：
 * 複雜繁瑣：需要了解模組的結構和型別，並編寫對應的型別定義。
 * 模組更新：如果模組更新，可能需要更新型別定義以保持同步。
 * 初始設置較複雜：初始設置和維護這些詳細的型別定義需要更多的精力。
 */
