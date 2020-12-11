import React, { useContext, useEffect, useRef, useState } from 'react';
import css from './Header.module.scss';
import Avatar from '@components/dashboard/Navbar/Avatar';
import AuthContext from '@components/dashboard/context/auth/AuthContext';
import InformationsContext from '@components/dashboard/context/informations/InformationsContext';
import Profil from '@components/dashboard/Navbar/Profil';
import useOnClickOutside from '@components/common/hooks/useOnClickOutside';
import { getRoute, ROUTE } from '@services/http/Route';
import { useRouter } from 'next/router';
import AuthService from '@services/domain/AuthService';

const Header = () => {
    const router = useRouter();
    const informationsContext = useContext(InformationsContext);
    const { getBrand, brand } = informationsContext;

    const authContext = useContext(AuthContext);
    const { userSignOut } = authContext;

    const [user, setUser] = useState(null);
    const [isProfilOpen, setIsProfilOpen] = useState(false);

    const avatarRef = useRef();
    useOnClickOutside(avatarRef, () => setIsProfilOpen(false));

    useEffect(() => {
        user && getBrand(user.partnerUniq);
    }, [getBrand, user]);

    useEffect(() => {
        setUser(AuthService.decodeAuthCookie());
    }, [setUser]);

    const onSignOut = async () => {
        await userSignOut();
        await router.push(getRoute(ROUTE.DASHBOARD.SIGN_IN, null));
        setIsProfilOpen(false);
    };

    const getInitial = () => {
        if (brand && brand.name && brand.name !== '') {
            return brand.name.charAt(0).toUpperCase();
        }
        if (user && user.firstName) {
            return user.firstName.charAt(0).toUpperCase();
        }
        return '';
    };

    const getColor = () => {
        if (brand && brand.color && brand.color !== '') {
            return brand.color;
        }
        return '#E22B76';
    };

    const getName = () => {
        if (brand && brand.name !== '') {
            return brand.name;
        }
        if (user && user.email) {
            return user.email;
        }
        return '';
    };

    const onToggleProfil = () => {
        setIsProfilOpen(!isProfilOpen);
    };

    return (
        <nav className={css.navbar}>
            <div className={css.navbar__left}>
                <img className={css.navbar__logo} src="/front-static/icons/logo-lpc.svg" alt={'logo lpc'} />
            </div>
            {user && (
                <div ref={avatarRef}>
                    <Avatar
                        onToggleProfil={() => onToggleProfil()}
                        initial={getInitial()}
                        name={getName()}
                        color={getColor()}
                        height={'38px'}
                        width={'38px'}
                    />
                    <Profil
                        onSignOut={() => onSignOut()}
                        isOpen={isProfilOpen}
                        initial={getInitial()}
                        name={getName()}
                        color={getColor()}
                    />
                </div>
            )}
        </nav>
    );
};

export default Header;
