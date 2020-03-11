import React from 'react';
import { H1 } from '../Foundation';

import {
    Root,
    Logo,
    NavItems,
    ItemsList,
    ListItem,
    NavLink
} from './StyledComponents';

const NavBar = ({ className }) => (
    <Root className={className}>
        <Logo>
            <H1>EasyEvent</H1>
        </Logo>
        <NavItems>
            <ItemsList>
                <ListItem>
                    <NavLink to="/auth">Login</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/events">Events</NavLink>
                </ListItem>
                <ListItem>
                    <NavLink to="/bookings">Bookings</NavLink>
                </ListItem>
            </ItemsList>
        </NavItems>
    </Root>
);

export default NavBar;