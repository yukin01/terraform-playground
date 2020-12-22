## 0.1.0

- Only `terraform plan` support
- Deploy backend service
- Progress bar is now displayed during communication

## 0.0.1

- Add syntax highlighting and TextArea
  - https://prismjs.com/#basic-usage-bundlers
  - https://github.com/mAAdhaTTah/babel-plugin-prismjs
  - https://nextjs.org/docs/advanced-features/customizing-babel-config
  - https://amitchauhan.tech/syntax-higlighting-with-prismjs/

## 0.0.1-alpha2

- Remove frontend
- Firebase init ([Log](https://gist.github.com/yukin01/0f78b62819557e0d542b9649b14cbe75))
  ```
  ❯ echo v14.15.1 >> .node-version
  ❯ yarn create next-app --example with-typescript frontend
  ❯ cd frontend
  ❯ yarn add -D firebase-tools
  ❯ yarn firebase init
  ```

## 0.0.1-alpha

- Create firebase project
- Enable Google Analytics integration
- Change to Blaze plan
- Set budget and alerts
- Create Firestore database
- firebase init ([Log](https://gist.github.com/yukin01/0f78b62819557e0d542b9649b14cbe75/eb6a034b759e9aa056a1598d96be3668d60f3f26))
  ```
  $ cd frontend
  $ yarn init
  $ yarn add -D firebase-tools
  $ yarn firebase init
  ```
