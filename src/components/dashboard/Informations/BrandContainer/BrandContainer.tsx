import React, { useContext, useEffect } from 'react';
import Brand from '@components/dashboard/Informations/Brand/Brand';
import InformationsContext from '@components/dashboard/context/informations/InformationsContext';
import InformationsService from '@services/domain/InformationsService';

type BrandContainerProps = {
    user: { merchantUniq: string };
};

const BrandContainer = ({ user }: BrandContainerProps) => {
    const informationsContext = useContext(InformationsContext);
    const { getBrand, updateBrand, brand, isFetching } = informationsContext;

    useEffect(() => {
        getBrand(user.merchantUniq);
    }, []);

    const onUpdateBrand = (body) => {
        updateBrand(body);
    };

    const onResetBrand = (body) => {
        InformationsService.resetBrand(body)
            .then(() => getBrand(user.merchantUniq))
            .catch((err) => err);
    };

    return (
        <>
            {!isFetching && Object.keys(brand).length > 0 && brand.constructor === Object && (
                <Brand
                    name={brand.name}
                    logo={brand.logo}
                    color={brand.color}
                    url={brand.siteUrl}
                    description={brand.description}
                    mentions={brand.mentions}
                    onUpdateBrand={(body) => onUpdateBrand(body)}
                    onResetBrand={(body) => onResetBrand(body)}
                    merchantUniq={user.merchantUniq}
                />
            )}
        </>
    );
};

export default React.memo(BrandContainer);
