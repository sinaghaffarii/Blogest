import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

// پیدا کردن فایل‌های swagger به صورت مستقیم
const findSwaggerFiles = () => {
  const possibleDirs = [
    path.join(__dirname, '../docs'),
    path.join(__dirname, '../../src/docs'),
    path.join(process.cwd(), 'src/docs'),
  ];

  for (const dir of possibleDirs) {
    if (fs.existsSync(dir)) {
      const files = fs
        .readdirSync(dir)
        .filter((file) => file.endsWith('.swagger.yaml'))
        .map((file) => path.join(dir, file));

      if (files.length > 0) {
        return files;
      }
    }
  }

  throw new Error('No swagger files found');
};

const loadSwaggerDocument = () => {
  try {
    const swaggerFiles = findSwaggerFiles();
    let combinedSpec = {
      openapi: '3.0.0',
      info: { title: 'Blog API', version: '1.0.0' },
      paths: {},
      components: { schemas: {} },
    };

    swaggerFiles.forEach((file) => {
      const content = fs.readFileSync(file, 'utf8');
      const spec = yaml.parse(content);

      if (spec.paths) Object.assign(combinedSpec.paths, spec.paths);
      if (spec.components?.schemas)
        Object.assign(combinedSpec.components.schemas, spec.components.schemas);
    });

    return combinedSpec;
  } catch (error) {
    console.error('Error loading swagger:', error);
    // Fallback spec
    return {
      openapi: '3.0.0',
      info: { title: 'Blog API', version: '1.0.0' },
      paths: {},
      components: {},
    };
  }
};

const swaggerDocument = loadSwaggerDocument();
export { swaggerUi, swaggerDocument };
