import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const swaggerFile = fs.readFileSync(
  path.join(__dirname, '../docs/swagger.yaml'),
  'utf8',
);
const swaggerDocument = yaml.parse(swaggerFile);

export { swaggerUi, swaggerDocument };
