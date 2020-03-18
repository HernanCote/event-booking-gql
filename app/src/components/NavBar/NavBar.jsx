import React, { useContext } from 'react';
import { H1 } from '../Foundation';

import AuthContext from '../../context/auth-context';

import {
    Root,
    Logo,
    NavItems,
    ItemsList,
    ListItem,
    NavLink,
    NavButton,
} from './StyledComponents';

const NavBar = ({ className }) => {
    const { token, logout } = useContext(AuthContext);

    return (
        <Root className={className}>
            <Logo>
                <H1>EasyEvent</H1>
            </Logo>
            <NavItems>
                <ItemsList>
                    <ListItem>
                        <NavLink to="/events">Events</NavLink>
                    </ListItem>
                    {!token && (
                        <ListItem>
                            <NavLink to="/auth">Login</NavLink>
                        </ListItem>
                    )}
                    {token && (
                        <>
                            <ListItem>
                                <NavLink to="/bookings">Bookings</NavLink>
                            </ListItem>
                            <ListItem>
                                <NavButton onClick={logout}>
                                    Logout
                                </NavButton>
                            </ListItem>
                        </>
                    )}
                </ItemsList>
            </NavItems>
        </Root>
    );
};


export default NavBar;