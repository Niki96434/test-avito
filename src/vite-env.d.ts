interface ImportMetaEnv {
    readonly VITE_API_KEY: string;
    readonly VITE_SERVER_PORT: number;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
