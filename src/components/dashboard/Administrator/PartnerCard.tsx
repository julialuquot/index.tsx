import React, { useCallback, useRef, useState } from 'react';
import css from './PartnerCard.module.scss';
import CardPopUp from '@components/dashboard/Administrator/CardPopUp';
import useOnClickOutside from '@components/common/hooks/useOnClickOutside';
import { useTranslation } from '@i18n';

type PartnerCardProps = {
    img: string;
    color: string;
    title: string;
    subtitle: string;
    status: string;
    onOpenModal: (boolean) => void;
    onSelectPartner: (string) => void;
};

const PartnerCard = ({ img, color, title, subtitle, status, onOpenModal, onSelectPartner }: PartnerCardProps) => {
    const { t } = useTranslation('dashboard-partners');

    const [isHover, setIsHover] = useState(false);
    const [isPopUpOpen, setIsPopUpOpen] = useState(false);

    const cardRef = useRef();
    useOnClickOutside(cardRef, () => setIsPopUpOpen(false));

    const headerStyle = {
        backgroundColor: color,
    };

    const onMouseEnter = () => {
        setIsHover(true);
    };

    const onMouseLeave = () => {
        setIsHover(false);
    };

    const onToggleProfil = () => {
        setIsPopUpOpen(!isPopUpOpen);
    };

    const handleOnSelectPartner = useCallback(
        (partner) => {
            onSelectPartner(partner);
        },
        [onSelectPartner],
    );

    return (
        <div ref={cardRef} className={css.wrapper}>
            <div
                className={css.card}
                onClick={() => handleOnSelectPartner(title)}
                onMouseEnter={() => onMouseEnter()}
                onMouseLeave={() => onMouseLeave()}
            >
                <div className={css.card__header} style={headerStyle}>
                    <img className={css.card__header__img} src={img} alt={title} />
                    <div onClick={() => onToggleProfil()} className={css.card__header__more}>
                        <img
                            className={`${css.card__header__more__icon} ${
                                isHover && css.card__header__more__icon__visible
                            }`}
                            src="/front-static/icons/more-horizontal.svg"
                            alt="more"
                        />
                    </div>
                </div>
                <div className={css.card__footer}>
                    <h5>{title}</h5>
                    <p>
                        {t('dashboard-partners:card.edit-on')} {subtitle}
                    </p>
                    <div className={css.card__footer__eye}>
                        <img src="/front-static/icons/show-eye.svg" alt="show" />
                    </div>
                </div>
            </div>

            <CardPopUp onOpenModal={(value) => onOpenModal(value)} isOpen={isPopUpOpen} status={status} />
        </div>
    );
};

export default PartnerCard;
