import { Project, SyntaxKind, Node } from 'ts-morph';

const removedFeatureName = process.argv[2]; // example isArticleEnables

const featureState = process.argv[3]; // onn /off

if (!removedFeatureName) {
    throw new Error('Укажите название фича-флага')
}

if (!featureState) {
    throw new Error('Укажите состояние фичи (on/off)')
}

if (featureState !== 'on' && featureState !== 'off') {
    throw new Error('Некорректное состояние фичи (допустимо on/off)')
}

const project = new Project();

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

const files = project.getSourceFiles();

function isToggleFunction(node: Node) {
    let isToggleFeatures = false;

    node.forEachChild(child => {
        if (child.isKind(SyntaxKind.Identifier) && child.getText() === 'toggleFeatures') {
            isToggleFeatures = true;
        }
    })

    return isToggleFeatures;
}

files.forEach((sourceFile) => {
   sourceFile.forEachDescendant(node => {
    if (node.isKind(SyntaxKind.CallExpression) && isToggleFunction(node)) {
        const objectOptions = node.getFirstDescendantByKind(SyntaxKind.ObjectLiteralExpression);

        if (!objectOptions) return;

        const onFunctionProperty = objectOptions.getProperty('on');
        const offFeatureProperty = objectOptions.getProperty('off');

        const featureNameProperty = objectOptions.getProperty('name');

        const onFunction = onFunctionProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
        const offFunction = offFeatureProperty?.getFirstDescendantByKind(SyntaxKind.ArrowFunction);
        const featureName = featureNameProperty?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
            ?.getText().slice(1, -1);

        if (featureName !== removedFeatureName) return;

        if (featureState === 'on') {
            node.replaceWithText(onFunction?.getBody().getText() ?? '')
        }

        if (featureState === 'off') {
            node.replaceWithText(offFunction?.getBody().getText() ?? '')
        }
    }
   })
});

project.save();
