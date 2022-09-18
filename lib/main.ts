import path from 'path';
import chalk from 'chalk';
import { execSync } from 'child_process';

import HttpProtocol from './http/index';

/**
 * @param args.dir spring 项目目录
 */
export default async function main(args: { projectDir: string; saveDir: string }) {
  try {
    execSync('which java');
  } catch(e) {
    throw new Error(chalk.red('❎ 请安装 Java 运行环境并添加环境变量。'));
  }

  try {
    execSync('which mvn');
  } catch(e) {
    throw new Error(chalk.red('❎ 请安装 Maven 运行环境并添加环境变量。'));
  }

  /*/ 安装依赖
  await new Promise((resolve) => {
    const jar = spawn('mvn', [
      'source:jar',
      'install',
      `-Dmaven.test.skip=true`
    ], { stdio: 'inherit', cwd: args.projectDir });

    jar.on('close', function() {
      resolve('');
    });
  });

  // 从项目解析出 oneapi.json
  const jsonSchemaPath: string = await new Promise((resolve) => {
    const springAdapter = path.join(__dirname, '../sdk/spring-adapter-1.0.0.jar');

    const jar = spawn('java', [
      '-jar',
      springAdapter,
      `-project=${args.projectDir}`,
      // 解析结果保存到项目根目录
      `-output=${args.saveDir}`,
    ], { stdio: 'inherit', cwd: args.projectDir });

    jar.on('close', function() {
      resolve(path.join(args.saveDir, 'oneapi.json'))
    });
  });*/

  const jsonSchemaPath = path.join(args.saveDir, 'oneapi.json');

  // 实例化 http 协议
  const httpPotocol = new HttpProtocol({
    filePath: jsonSchemaPath,
    projectDir: args.projectDir,
    saveDir: args.saveDir,
  }); 
  
  // 生成 service 文件
  // httpPotocol.generateService();

  // 生成 OpenAPI schema
  httpPotocol.generateOpenApi();
}
