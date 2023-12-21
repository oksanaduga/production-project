import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import {
    getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile,
} from '@/shared/const/router';
import MainIcon from '@/shared/assets/icons/main.svg?react';
import AboutIcon from '@/shared/assets/icons/about.svg?react';
import ProfileIcon from '@/shared/assets/icons/profile.svg?react';
import ArticleIcon from '@/shared/assets/icons/article.svg?react';
import { SidebarItemType } from '../types/sidebar';

export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'main',
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'about',
            },
        ];

        if (userData) {
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData.id),
                    Icon: ProfileIcon,
                    text: 'profile',
                    authOnly: true,
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticleIcon,
                    text: 'articles',
                    authOnly: true,
                },
            );
        }

        return sidebarItemsList;
    },
);
