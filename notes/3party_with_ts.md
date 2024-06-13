# 第三方套件 搭配 typescript

**問題**

- 第三方套件 搭配 typescript 時出現問題 (Splidejs)

- 描述: 使用 Splidejs 時，會出現以下錯誤訊息

  ```js
  import { Splide, SplideSlide } from '@splidejs/react-splide';

  /**
   * Could not find a declaration file for module '@splidejs/react-splide'.
   * 'c:/Users/30130/Desktop/nextJS/udn_story/node_modules/@splidejs/react-splide/dist/js/react-splide.esm.js' implicitly has an 'any' type.
   */
  ```

- 原因: 這個錯誤的原因是 TypeScript 無法找到 @splidejs/react-splide 的型別定義文件。

當你使用的第三方庫沒有提供 TypeScript 型別定義時，TypeScript 編譯器會報錯。這是因為 TypeScript 無法知道這些庫的接口或它們的型別。

**解法一**

- 使用 `@ts-ignore` 忽略錯誤

  ```js
  // @ts-ignore
  import { Splide, SplideSlide } from '@splidejs/react-splide';
  ```

- 缺點: 這樣做的話，就無法享受到 TypeScript 的好處，因為 TypeScript 無法檢查這個模組的型別。
- 來源: `https://github.com/Splidejs/splide/issues/1179`

**解法二**

- 更改 node_modules/@splidejs/react-splide/ 裡的 package.json

  ```json
  {
    // ...omitted
    "exports": {
      ".": {
        "types": "./dist/types/index.d.ts", // ADD THIS LINE !!!!!
        "require": "./dist/js/react-splide.cjs.js",
        "import": "./dist/js/react-splide.esm.js",
        "default": "./dist/js/react-splide.esm.js"
      },
      "./css": "./dist/css/splide.min.css",
      "./css/core": "./dist/css/splide-core.min.css",
      "./css/*": "./dist/css/themes/splide-*.min.css"
    }
  }
  ```

- 缺點: 這樣做的話，每次更新套件時，都需要重新修改 package.json，並且這樣做會讓你的專案變得不可維護 (cicd)。
- 來源: `https://github.com/Splidejs/splide/issues/1179`

**解法三**

- 如果 @splidejs/react-splide 沒有提供型別定義，你可以在專案中手動宣告模組的型別。

1. 創建一個新的檔案，例如 src/types/splide.d.ts

2. 新增內容 (這個檔案的目的是告訴 TypeScript 如何處理 @splidejs/react-splide)

   ```ts
   declare module '@splidejs/react-splide';
   //...  //詳見: 實體檔
   ```

3. tsconfig.json 設定

   ```json
   {
     "compilerOptions": {
       "typeRoots": ["node_modules/@types", "./src/types"]
     }
   }
   ```

**小結**

其實 `解法二` 是最好的，因為這是使用官方自定義的 types

但是該套件沒有將 types 給 export 出去 (不知原因)，
而解法二硬修改，添加 export type 從 @splidejs/react-splide 的 package.json

這樣做的話，每次更新套件時，都需要重新修改 package.json，
並且這樣做會讓你的專案變得不可維護 (cicd)。

所以只能用 `解法三`
只是解法三是手動宣告模組的 types， 也宣告得很簡單
本質其實有點類似於 `解法一`
