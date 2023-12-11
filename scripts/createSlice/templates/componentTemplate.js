module.exports = (componentName) => `import { classNames } from 'shared/lib/classNames/classNames';
    import cls from './${componentName}.module.scss';
    import { useTranslation } from 'react-i18next';
    import { memo } from 'react';
    interface ${componentName}Props {
        className?: string;
    }

    export const ${componentName} = memo((props: ${componentName}Props) => {
        const { className} = props;

        const { t } = useTranslation();

        return (
            <div className={classNames(cls.${componentName}, {}, [className])}>
            </div>
        )
    });
    `;
