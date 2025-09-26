import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

class SwaggerMerger {
  private docsDir: string;

  constructor() {
    this.docsDir = path.join(process.cwd(), 'src/docs');
  }

  private findSwaggerFiles(): string[] {
    if (!fs.existsSync(this.docsDir)) return [];
    return fs
      .readdirSync(this.docsDir)
      .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'))
      .map((file) => path.join(this.docsDir, file));
  }

  private loadAndParseFiles(): any[] {
    return this.findSwaggerFiles().map((file) => {
      const content = fs.readFileSync(file, 'utf8');
      return yaml.parse(content);
    });
  }

  private deepMerge(target: any, source: any): any {
    if (source === null || typeof source !== 'object') return source;
    if (Array.isArray(source)) return [...source];

    const result = { ...target };
    for (const [key, value] of Object.entries(source)) {
      result[key] =
        value && typeof value === 'object' && !Array.isArray(value)
          ? this.deepMerge(result[key] || {}, value)
          : value;
    }
    return result;
  }

  public generateSwaggerDocument(): any {
    const files = this.loadAndParseFiles();

    const baseSpec: any = {
      openapi: '3.0.0',
      info: {
        title: 'Backend API',
        version: '1.0.0',
        description: 'API Documentation',
      },
      servers: [
        { url: 'http://localhost:8000/api', description: 'Local Server' },
      ],
      paths: {},
      components: { schemas: {}, securitySchemes: {} },
    };

    for (const spec of files) {
      if (spec.components?.securitySchemes) {
        baseSpec.components.securitySchemes = this.deepMerge(
          baseSpec.components.securitySchemes,
          spec.components.securitySchemes,
        );
      }
      if (spec.components?.schemas) {
        baseSpec.components.schemas = this.deepMerge(
          baseSpec.components.schemas,
          spec.components.schemas,
        );
      }
      if (spec.paths) {
        baseSpec.paths = this.deepMerge(baseSpec.paths, spec.paths);
      }
    }

    baseSpec.security = [{ bearerAuth: [] }];
    return baseSpec;
  }
}

const swaggerMerger = new SwaggerMerger();
const swaggerDocument = swaggerMerger.generateSwaggerDocument();

export { swaggerUi, swaggerDocument };
