import ProfileIcon from 'images/icons/profile.png';
import DashboardIcon from 'images/icons/dashboard.png';
import ServicesIcon from 'images/icons/services.png';
import SamplesIcon from 'images/icons/samples.png';
import HomeIcon from 'images/icons/home.png';
import LogoutIcon from 'images/icons/logout.png';
import ReviewsIcon from 'images/icons/reviews.png';
import {
  HOME,
  PROFILE,
  DASHBOARD,
  LEARN,
  DISCUSS,
  ABOUT_US,
  LEADERBOARD,
} from './consts';

const LoggedOutOptions = () => [
  {
    label: HOME,
    url: '/',
    icon: HomeIcon,
  },
  {
    label: 'Sign In',
    url: '/auth',
    icon: LogoutIcon,
  },
];

const LoggedInOptions = () => [
  {
    label: DASHBOARD,
    url: `/dashboard`,
    icon: HomeIcon,
  },
  {
    label: LEARN,
    url: '/topics',
    icon: SamplesIcon,
  },
  {
    label: DISCUSS,
    url: '/discuss',
    icon: ReviewsIcon,
  },
  {
    label: LEADERBOARD,
    url: '/my/stats',
    icon: ServicesIcon,
  },
  {
    label: PROFILE,
    url: '/my/profile',
    icon: ProfileIcon,
  },
  {
    label: 'Log out',
    url: '',
    icon: LogoutIcon,
  },
];

export const GetSideMenuOptions = isLoggedIn => {
  if (isLoggedIn) {
    return LoggedInOptions();
  }

  return LoggedOutOptions();
};
