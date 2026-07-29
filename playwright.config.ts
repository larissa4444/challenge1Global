import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  reporter: 'html',
  use: {
    // Força o navegador a rodar em resolução Desktop padrão em todos os testes
    viewport: { width: 1280, height: 720 },
    
    // Ferramentas de evidência profissional para falhas (geram arquivos limpos automaticamente)
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
