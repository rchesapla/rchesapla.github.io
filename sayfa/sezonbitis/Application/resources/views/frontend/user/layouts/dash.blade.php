<!DOCTYPE html>
<html lang="{{ getLang() }}">

<head>
    @include('frontend.user.includes.head')
    @include('frontend.user.includes.styles')
</head>

@include('frontend.includes.adblock-detection')

<body>
    <div class="dash">
        <div class="dash-navbar">
            <div class="logo">
                <a href="{{ url('/') }}">
                    <img src="{{ asset($settings['website_light_logo']) }}" alt="{{ $settings['website_name'] }}" />
                </a>
            </div>
            <div class="dash-navbar-content">
                <div class="dash-nav-link dash-sidebar-btn">
                    <i class="fa fa-bars"></i>
                </div>
                @hasSection('search')
                    <div class="search">
                        <div class="search-input">
                            <label for="search" class="search-icon">
                                <i class="fa fa-search"></i>
                            </label>
                            <form action="{{ url()->current() }}" method="GET">
                                <input id="search" type="text" name="search"
                                    placeholder="{{ lang('Type to search', 'user') }}"
                                    value="{{ request()->search ?? '' }}" />
                            </form>
                            <div class="search-close">
                                <i class="fa fa-times"></i>
                            </div>
                        </div>
                    </div>
                @endif
                <div class="dash-navbar-actions">
                    @hasSection('search')
                        <div class="dash-nav-link search-btn">
                            <i class="fa fa-search"></i>
                        </div>
                    @endif
                    <div class="dropdown language v2">
                        <button class="dash-nav-link v2" data-bs-toggle="dropdown" aria-expanded="false">
                            <div class="language-icon">
                                <i class="fas fa-globe"></i>
                            </div>
                            <span class="language-title">{{ getLangName() }}</span>
                            <div class="language-arrow">
                                <i class="fas fa-chevron-down fa-xs me-0"></i>
                            </div>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            @foreach ($languages as $language)
                                <li><a class="dropdown-item {{ getLang() == $language->code ? 'active' : '' }}"
                                        href="{{ langURL($language->code) }}">{{ $language->name }}</a></li>
                            @endforeach
                        </ul>
                    </div>
                    @include('frontend.user.includes.notification-menu')
                    <div class="user-menu mx-0" data-dropdown>
                        <div class="dash-nav-link v2">
                            <div class="user-avatar">
                                <img src="{{ asset(userAuthInfo()->avatar) }}" alt="{{ userAuthInfo()->name }}" />
                            </div>
                            <p class="user-name mb-0 ms-2 d-none d-sm-block">{{ userAuthInfo()->name }}</p>
                            <div class="nav-bar-user-dropdown-icon ms-2 d-none d-sm-block">
                                <i class="fas fa-chevron-down fa-xs me-0"></i>
                            </div>
                        </div>
                        <div class="user-menu-dropdown">
                            <a class="user-menu-link" href="{{ route('user.settings') }}">
                                <i class="fa fa-cog"></i>
                                {{ lang('Settings', 'user') }}
                            </a>
                            <a class="user-menu-link text-danger" href="#"
                                onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <i class="fa fa-power-off"></i>
                                {{ lang('Logout', 'user') }}
                            </a>
                        </div>
                        <form id="logout-form" class="d-inline" action="{{ route('logout') }}" method="POST">
                            @csrf
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="dash-sidebar">
            <div class="overlay"></div>
            <div class="dash-sidebar-container">
                <div class="dash-sidebar-body" ps>
                    <div class="dash-sidebar-links">
                        <a href="{{ route('user.dashboard') }}"
                            class="dash-sidebar-link {{ request()->routeIs('user.dashboard') ? 'current' : '' }}">
                            <div class="dash-sidebar-link-title">
                                <i class="fas fa-columns fa-lg"></i>
                                <span>{{ lang('Dashboard', 'user') }}</span>
                            </div>
                        </a>
                        <a href="{{ route('user.files.index') }}"
                            class="dash-sidebar-link {{ request()->routeIs('user.files.index') || request()->routeIs('user.files.edit') ? 'current' : '' }}">
                            <div class="dash-sidebar-link-title">
                                <i class="fas fa-folder fa-lg"></i>
                                <span>{{ lang('My files', 'user') }}</span>
                            </div>
                        </a>
                        @if (licenseType(2))
                            <a href="{{ route('user.subscription') }}"
                                class="dash-sidebar-link {{ request()->routeIs('user.subscription') ? 'current' : '' }}">
                                <div class="dash-sidebar-link-title">
                                    <i class="far fa-gem fa-lg"></i>
                                    <span>{{ lang('My subscription', 'user') }}</span>
                                </div>
                            </a>
                        @endif
                        <a href="{{ route('user.settings') }}"
                            class="dash-sidebar-link 
                        {{ request()->routeIs('user.settings') || request()->routeIs('user.settings.2fa') || request()->routeIs('user.settings.password') ? 'current' : '' }}">
                            <div class="dash-sidebar-link-title">
                                <i class="fas fa-cog fa-lg"></i>
                                <span>{{ lang('Settings', 'user') }}</span>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="dash-sidebar-footer">
                    @php
                        if (subscription()->storage->fullness > 80) {
                            $progressClass = 'class="bg-danger"';
                        } elseif (subscription()->storage->fullness < 80 && subscription()->storage->fullness > 60) {
                            $progressClass = 'class="bg-warning"';
                        } else {
                            $progressClass = '';
                        }
                    @endphp
                    <div class="dash-storage">
                        <div class="dash-storage-info">
                            <p class="dash-storage-text mb-0">{{ subscription()->storage->used->format }} /
                                {{ subscription()->formates->storage_space }}</p>
                        </div>
                        @if (!subscription()->is_lifetime && subscription()->plan->storage_space)
                            <div class="dash-storage-progress">
                                <span style="width: {{ subscription()->storage->fullness }}%"
                                    {!! $progressClass !!}></span>
                            </div>
                        @endif
                        @if (licenseType(2) && $countPlans > 1)
                            <a href="{{ route('user.plans') }}" class="btn btn-primary btn-md w-100 mt-3"><i
                                    class="fas fa-arrow-up me-2"></i>{{ lang('Upgrade', 'user') }}</a>
                        @endif
                    </div>
                </div>
            </div>
        </div>
        <div class="dash-body">
            <div class="dash-container">
                <div class="dash-page-header">
                    <div class="row justify-content-between align-items-center g-3">
                        <div class="col-auto">
                            <h4 class="dash-page-title">@yield('title')</h4>
                            @include('frontend.user.includes.breadcrumb')
                        </div>
                        <div class="col-auto">
                            @hasSection('back')
                                <a href="@yield('back')" class="btn btn-gradient btn-md me-2"><i
                                        class="fas fa-arrow-left me-2"></i>{{ lang('Back', 'user') }}</a>
                            @endif
                            @hasSection('link')
                                <a href="@yield('link')" class="btn btn-primary btn-md me-2"><i
                                        class="fa fa-plus"></i></a>
                            @endif
                            @hasSection('upload')
                                <button class="btn btn-primary" data-dz-click><i
                                        class="fas fa-upload me-2"></i>{{ lang('Upload', 'user') }}</button>
                            @endif
                            @if (request()->routeIs('user.subscription'))
                                @if (!subscription()->is_canceled)
                                    @if (!subscription()->plan->free_plan && !subscription()->is_lifetime)
                                        <form class="d-inline me-2"
                                            action="{{ route('subscribe', [hashid(subscription()->plan->id), 'renew']) }}"
                                            method="POST">
                                            @csrf
                                            <button class="confirm-action-form btn btn-green"><i
                                                    class="fas fa-sync-alt"></i>
                                                <span
                                                    class="ms-2 d-none d-lg-inline">{{ lang('Renew Subscription', 'subscription') }}</span>
                                            </button>
                                        </form>
                                    @endif
                                    <a href="{{ $countPlans > 1 ? route('user.plans') : '#' }}"
                                        class="btn btn-primary {{ $countPlans > 1 ? '' : 'disabled' }}"><i
                                            class="far fa-gem"></i>
                                        <span
                                            class="ms-2 d-none d-lg-inline">{{ lang('Upgrade', 'subscription') }}</span>
                                    </a>
                                @endif
                            @endif
                            @if (request()->routeIs('user.notifications'))
                                @if ($unreadUserNotifications)
                                    <a class="confirm-action btn btn-gradient"
                                        href="{{ route('user.notifications.readall') }}">{{ lang('Make All as Read', 'user') }}</a>
                                @else
                                    <button class="btn btn-gradient"
                                        disabled>{{ lang('Make All as Read', 'user') }}</button>
                                @endif
                            @endif
                        </div>
                    </div>
                </div>
                <div class="dash-page-body">
                    @yield('content')
                </div>
            </div>
            <footer class="dash-page-footer mt-auto">
                <div class="row justify-content-between">
                    <div class="col-auto">
                        <p class="mb-0">&copy; <span data-year></span> {{ $settings['website_name'] }} -
                            {{ lang('All rights reserved') }}.</p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
    @hasSection('upload')
        @include('frontend.global.includes.uploadbox')
    @endif
    @include('frontend.configurations.config')
    @include('frontend.configurations.widgets')
    @include('frontend.user.includes.scripts')
</body>

</html>
