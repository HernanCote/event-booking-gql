import React from 'react';
import { H1 } from '../Foundation';

import AuthContext from '../../context/auth-context';

import {
    Root,
    Logo,
    NavItems,
    ItemsList,
    ListItem,
    NavLink
} from './StyledComponents';

const NavBar = ({ className }) => (
    <AuthContext.Consumer>
        {({ token }) => {
            return (
                <Root className={className}>
                    <Logo>
                        <NavLink to="/">
                            <H1>EasyEvent</H1>
                        </NavLink>
                    </Logo>
                    <NavItems>
                        <ItemsList>

                            <ListItem>
                                <NavLink to="/events">Events</NavLink>
                            </ListItem>
                            {token && (
                                <ListItem>
                                    <NavLink to="/bookings">Bookings</NavLink>
                                </ListItem>
                            )}
                            {!token && (
                                <ListItem>
                                    <NavLink to="/auth">Login</NavLink>
                                </ListItem>
                            )}
                        </ItemsList>
                    </NavItems>
                </Root>
            );
        }}

    </AuthContext.Consumer>
);

export default NavBar;