# nextjs Warning: Extra attributes from the server...

**問題**

```js
//console.error
app-index.tsx:25  Warning: Extra attributes from the server: monica-locale,monica-version,monica-id
    at body
    at html
    at RootLayout (Server)
    at RedirectErrorBoundary ...
```

```html
<body
	class="bg-landscape-300"
	monica-locale="zh_TW"
	monica-version="5.6.4"
	monica-id="fhimbbbmdjiifimnepkibjfjbppnjble"
>
	...
</body>
```

**原因**

This is usually caused by an extension passing these extra attributes with your code
when it is executed on the browser trying to interact with the UI,
this creates a mismatch between what was rendered on the server and what is rendered on the client.

**解法**
You can suppress hydration warnings by setting `suppressHydrationWarning` to true in the opening `<body>` tag of the RootLayout:

```js
export default RootLayout({ children }) {
  return (
   <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
```

**參考資料**
`https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c`
