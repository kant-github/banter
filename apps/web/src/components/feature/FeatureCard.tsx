import React from 'react';

const FeatureCard = ({title, description, icon}: {
    title: string,
    description: string,
    icon: any
}) => {
    return (
        <div className='flex flex-col justify-center gap-y-2 px-6 border-[1px] rounded-md'>
            <div className=''>
                {icon}
            </div>
            <div className=''>
                <p className='font-medium text-sm'>{title}</p>
            </div>
            <div className='pb-4'>
                <p className='font-mono text-xs'>
                    {description}
                </p>
            </div>
        </div>
    );
};

export default FeatureCard;
