# バックエンド環境

## セットアップ

### インストール
```shell
$ yarn install
```

### Docker起動
```shell
$ docker-compose up
```

### マイグレーション
```shell
$ npx prisma migrate
```

### typeをgenerate
```shell
$ npx prisma generate
```

### 初期データ作成
```shell
$ yarn seed
```

### サーバー起動
```shell
$ start:dev
```
### 起動したサーバーを開く
```shell
$ open http://localhost:4000/graphql
```