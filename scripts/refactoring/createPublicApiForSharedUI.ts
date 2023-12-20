import { Project } from 'ts-morph';
import path from 'path';
import { isAbsolute } from './helpers';

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

const uiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');

const sharedUiDirectory = project.getDirectory(uiPath);

const componentsDir = sharedUiDirectory?.getDirectories();

componentsDir?.forEach((directory) => {
    const indexFilePath = `${directory.getPath()}/index.ts`;

    const indexFile = directory.getSourceFile(indexFilePath);

    if (!indexFile) {
        const sourceCode = `export * from './${directory.getBaseName()}'`;
        const file = directory.createSourceFile(indexFilePath, sourceCode, { overwrite: true });

        file.save();
    }
});

files.forEach((sourceFile) => {
    const importDeclarations = sourceFile.getImportDeclarations();

    importDeclarations.forEach((importDeclaration) => {
        const value = importDeclaration.getModuleSpecifierValue();

        const withoutAlias = value.replace('@/', '');

        const segments = withoutAlias.split('/');

        const isSharedLayer = segments?.[0] === 'shared';
        const isUi = segments?.[1] === 'ui';

        if (isAbsolute(withoutAlias) && isSharedLayer && isUi) {
            const newImport = withoutAlias.split('/').slice(0, 3).join('/');
            importDeclaration.setModuleSpecifier(`@/${newImport}`);
        }
    });
});

project.save();
