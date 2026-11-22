# ハイゲなう。（外部公開版）

配信者ハイパーゲーム大会 FINAL（2026年11月28日・29日、東京ドーム）の非公式まとめページ「ハイゲなう。」を、GitHub Pages で公開するためのサイト一式です。

もともと Muse の公開スペースで配信していましたが、Muse の公開リンクは更新のたびに承認操作が必要で自動更新できないため、自動更新できる外部ホスティング（GitHub Pages）へ移行します。

## 構成

| ファイル | 役割 |
|---|---|
| `index.html` | 公開ページ本体（単一ファイル、CSS・画像は埋め込み済み）。このファイルがそのまま公開されます |
| `deploy.sh` | `index.html` の変更を検知して commit & push するデプロイ用スクリプト（雛形） |
| `README.md` | このファイル |

## 更新の運用

- 30分ごとの定期チェックで配信状況・バズ情報などを調べ、変更があれば `index.html` を新しい内容に差し替えます。
- 差し替え後に `./deploy.sh` を実行すると、変更がある場合のみ commit & push され、GitHub Pages 側に自動で反映されます（承認操作は不要）。
- 大会終了（2026年11月29日）以降は実質更新終了です。

## GitHub 側の準備手順（初回のみ）

1. GitHub アカウントを作成する（未作成の場合）。
2. 新しいリポジトリを作成する（例：リポジトリ名 `haige-now`）。公開範囲は **Public** にする（GitHub Pages の無料公開に必要）。
3. このフォルダの中身（`index.html`、`README.md`、`deploy.sh`）をリポジトリに push する。
4. リポジトリの **Settings → Pages** を開き、公開元（Source）に **Deploy from a branch** を選び、ブランチは **main**、フォルダは **/ (root)** を指定して保存する。
5. 数分待つと公開される。公開URLの形式は次のとおり：

   `https://<GitHubユーザー名>.github.io/<リポジトリ名>/`

   （例：ユーザー名が `example`、リポジトリ名が `haige-now` なら `https://example.github.io/haige-now/`）
6. デプロイ用の認証情報を用意する：
   - GitHub の **Settings → Developer settings → Personal access tokens** で、このリポジトリへの書き込み（Contents: Read and write）ができるトークンを発行する。
   - トークンの実値はチャットやファイルに書かず、実行環境の環境変数 `GITHUB_TOKEN` で渡す。リポジトリのURLは環境変数 `REPO_URL`（例：`https://github.com/<user>/<repo>.git`）で渡す。

## 注意

- `index.html` は Muse 側の完成済みビルドを書き出したものです。内容の編集は Muse 側で行い、ここでは差し替えのみ行います。
- ページ内のリンク（Twitch / YouTube / 切り抜き元記事など）は外部サイトへのリンクで、移行後もそのまま動作します。
