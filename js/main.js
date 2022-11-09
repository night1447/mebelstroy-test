var mainFilter = new Swiper(".main__swiper", {
    loop: true,
    slidesPerView: 'auto',
    navigation: {
        nextEl: ".main__button-next",
        prevEl: ".main__button-prev",
    },
    breakpoints: {
        100: {
            spaceBetween: 24,
        },
        768: {
            spaceBetween: 32,
        }
    }
});
var recommendationSwiper = new Swiper(".recommendation__swiper", {
    loop: true,
    slidesPerView: 'auto',
    navigation: {
        nextEl: ".recommendation__button-next",
        prevEl: ".recommendation__button-prev",
    },
    breakpoints: {
        100: {
            spaceBetween: 24,
        },
        768: {
            spaceBetween: 32,
        }
    }
});
var featuresSwiper = new Swiper(".first-screen__features", {
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 'auto',
            spaceBetween: 16,
        },
        576: {
            slidesPerView: 3,
            spaceBetween: 12,

        },
        700: {
            slidesPerView: 4,
            spaceBetween: 12,
        },
        991: {
            slidesPerView: 3,
            spaceBetween: 32,
        }, 1600: {
            slidesPerView: 4,
            spaceBetween: 32,
        },
    }
});
var servicesSwiper = new Swiper(".services__swiper", {
    loop: true,
    slidesPerView: 'auto',
    grid: {
        rows: 2,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        320: {
            spaceBetween: 20,
            grid: {
                rows: 2,
            }
        },
        576: {
            spaceBetween: 24,
            grid: {
                rows: 2,
            }
        },
        768: {
            spaceBetween: 24,
            grid: {
                rows: 2,
            }
        },
        1024: {
            spaceBetween: 32,
            grid: {
                rows: 1,
            }
        }
    }
});
window.onload = function () {
    "use strict";
    var swiper = new Swiper(".first-screen__swiper", {

        slidesPerView: 1,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".first-screen__pagination_bullet",
            type: 'bullets',
        },
        breakpoints: {
            320: {
                pagination: {
                    el: ".first-screen__pagination_bullet",
                    type: 'bullets',
                },
            },
            576: {
                pagination: {
                    el: ".first-screen__pagination_progress",
                    type: 'progressbar',
                },
            }
        }
    });


    //Linking navigation with block
    const linkingNavigation = ({
                                   wrapperSelector: wrapperSelector,
                                   navigationListSelector: navigationListSelector,
                                   linkingBlockSelector: linkingBlockSelector = '.linking-block',
                                   activeSelector: activeSelector = '._active',
                                   foundTitle: foundTitle = false,
                               }) => {
        const activeClass = activeSelector.substring(1, activeSelector.length);
        let state = {data: '', element: ''};
        const init = (list, wrap) => {
            const navElement = list.querySelector(activeSelector);
            const data = navElement.dataset.block;
            wrap.querySelector(`${linkingBlockSelector}[data-block='${data}']`).style.display = 'block';
            if (foundTitle) {
                wrap.querySelector(`.linking-title[data-block='${data}']`).style.display = 'block';
            }
            state = {data: data, element: navElement};
        }
        const hiddenNotSelected = (blocks, data) => {
            blocks.forEach(block => {
                if (block.dataset.block !== data) {
                    block.style.display = 'none';
                } else {
                    block.style.display = 'block';
                }
            })
        }
        const list = document.querySelector(navigationListSelector);
        const wrap = document.querySelector(wrapperSelector);
        if (wrap && list) {
            const linkBlocks = wrap.querySelectorAll(linkingBlockSelector);
            init(list, wrap);
            list.addEventListener('click', (event) => {
                const closest = event.target.closest('.linking-item');
                if (closest) {
                    const link = closest;
                    const data = link.dataset.block;
                    if (data !== state.data) {
                        state.element.classList.remove(activeClass);
                        state = {data: data, element: link};
                        link.classList.add(activeClass);
                        hiddenNotSelected(linkBlocks, data);
                        if (foundTitle) {
                            const listTitle = wrap.querySelectorAll('.linking-title');
                            hiddenNotSelected(listTitle, data);
                        }
                    }
                }
            })
        }
    }
//Cancellation Input calculator
    const cancellationTextArea = document.querySelector('.cancellation__textarea');
    const cancellationCounter = document.querySelector('.cancellation__counter');
    if (cancellationTextArea) {
        cancellationTextArea.addEventListener('input', () => {
            const value = cancellationTextArea.value.length;
            const field = cancellationCounter.querySelector('._counter');
            field.innerHTML = value;
        });
    }
    const choicesWhatHappen = document.querySelector('.cancellation__choices');
    const cancellationWrapper = document.querySelector('.cancellation__wrapper');
    if (choicesWhatHappen) {
        choicesWhatHappen.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('checkbox__input')) {
                const textarea = cancellationWrapper.querySelector('.cancellation__label_textarea');
                if (target.getAttribute('id') === 'radio-other') {
                    textarea.classList.add('_active');

                } else {
                    textarea.classList.remove('_active');
                }
            }
        })
    }
    //AUTH popup
    const buttonPopUpUser = document.querySelector('.menu__button_auth');
    if (buttonPopUpUser) {
        const closest = buttonPopUpUser.closest('.menu__item');
        const popup = closest.querySelector('.popup-user');
        const close = popup.querySelector('.close');
        buttonPopUpUser.addEventListener('click', () => {
            popup.classList.add('_active');
            close.addEventListener('click', () => {
                popup.classList.remove('_active');
            })
        })
        window.onscroll = function () {
            popup.classList.remove('_active');
        }
    }
    //Auth
    const togglePasswordButtons = document.querySelectorAll('.auth-modal__show-password');
    const inputsPassword = document.querySelectorAll('.auth-modal__input_pass');
    togglePasswordButtons.forEach((togglePassword, index) => {
        togglePassword.addEventListener('click', () => {
            if (inputsPassword[index].getAttribute('type') === 'password') {
                inputsPassword[index].type = 'text';
            } else {
                inputsPassword[index].type = 'password';
            }
            togglePassword.classList.toggle('_show')
        });
    })
    const newPasswordFirst = document.getElementById('new-password');
    const newPasswordSecond = document.getElementById('new-password-repeat');
    const changePasswordButton = document.getElementById('change-password');
    newPasswordSecond.addEventListener('input', () => {
        if (newPasswordSecond.value !== newPasswordFirst.value) {
            newPasswordSecond.classList.add('_invalid');
            changePasswordButton.disabled = true;
        } else {
            newPasswordSecond.classList.remove('_invalid');
            changePasswordButton.disabled = false;
        }
    })
    const authSettings = {
        wrapperSelector: '.auth-modal__shell',
        navigationListSelector: '.auth-modal__choices',
    }
    linkingNavigation(authSettings);
    const authWrapper = document.querySelector('.auth-modal__wrapper');
    if (authWrapper) {
        const mainBlocks = authWrapper.querySelectorAll('.auth-linking-block')
        mainBlocks.forEach(block => {
            if (block.classList.contains('_active')) {
                block.style.display = 'block';
            } else {
                block.style.display = 'none';
            }
        })

        const hiddenNotSelected = (blocks, data) => {
            blocks.forEach(block => {
                if (block.dataset.block !== data) {
                    block.style.display = 'none';
                } else {
                    block.style.display = 'block';
                }
            })
        }

        authWrapper.addEventListener('click', (event) => {
            if (event.target.classList.contains('auth-linking')) {
                event.preventDefault();
                const data = event.target.dataset.block;
                hiddenNotSelected(mainBlocks, data);
                const newPasswordButton = document.querySelector('[data-go=new-password]');
                newPasswordButton.addEventListener('click', (event) => {
                    event.preventDefault();
                    setTimeout(() => {
                        hiddenNotSelected(mainBlocks, 'new-password');
                    }, 500);
                })

            }
        })
    }

    //PROFILE
    const profileSettings = {
        wrapperSelector: '.profile__inner',
        linkingBlockSelector: '.profile__linking-block',
        navigationListSelector: '.profile__navigation',
    }
    linkingNavigation(profileSettings);
    const profilePasswordButton = document.querySelector('.user-data__change-password');
    if (profilePasswordButton) {
        profilePasswordButton.addEventListener('click', () => {
            const closest = profilePasswordButton.closest('.user-data__section');
            const collapse = new ItcCollapse(closest.querySelector('.collapse'));
            profilePasswordButton.style.display = 'none';
            collapse.toggle();
        })
    }
    const labelsCorrectSize = document.querySelectorAll('.label');
    if (labelsCorrectSize) {
        labelsCorrectSize.forEach(label => {
            label.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', (event) => {
                    if (event.target.value.length > 1) {
                        label.classList.add('_checked');
                    } else label.classList.remove('_checked');

                })
            })
        })
    }
    //COOKIES
    const cookies = document.querySelector('.cookies');
    const declineCookies = cookies.querySelector('.cookies__close');
    const acceptCookies = cookies.querySelector('.cookies__accept');
    acceptCookies.addEventListener('click', () => {
        cookies.classList.remove('_active');
    })
    declineCookies.addEventListener('click', () => {
        cookies.classList.remove('_active');
    })

    setTimeout(() => {
        cookies.classList.add('_active');
    }, 4000);

    const setStateMoreList = (blocksContainsMoreSelector) => {
        const block = document.querySelectorAll(blocksContainsMoreSelector);
        block.forEach(category => {
            const buttons = category.querySelectorAll('.more-button');
            const lists = category.querySelectorAll('.more-list');
            if (buttons && lists) {
                buttons.forEach((button, index) => {
                    button.addEventListener('click', () => {
                        const collapse = new ItcCollapse(lists[index]);
                        button.style.display = "none";
                        collapse.toggle();
                    })
                })

            }
        })
    }
    const setModalDependencies = (selectorModal, selectorOnButton) => {
        const modal = document.querySelector(selectorModal);
        const button = document.querySelector(selectorOnButton);
        let close;
        if (modal) {
            close = modal.querySelector('.modal__close');

            if (button !== null) {
                button.addEventListener('click', () => {
                    modal.classList.add('_active');
                    document.body.classList.add('overflowY-hidden');
                })
                close.addEventListener('click', () => {
                    modal.classList.remove('_active');
                    document.body.classList.remove('overflowY-hidden');
                })
            }
        }
    }
//CATEGORY_MORE
    setStateMoreList('body');
    //HEADER_MENU
    const headerShowMenuHandler = () => {
        const navigationCollapseItem = document.querySelectorAll('.navigation__item');
        navigationCollapseItem.forEach(item => {
            const hrefs = item.querySelectorAll('.navigation__href_collapse');
            const lists = item.querySelectorAll('.navigation__collapse-menu');
            const close = item.querySelectorAll('.navigation__collapse-close');
            if (hrefs && lists) {
                hrefs.forEach((href, index) => {
                    href.addEventListener('click', (event) => {
                        event.preventDefault();
                        lists[index].classList.toggle('jsShowCollapseMenu');
                        href.classList.toggle('_active');
                    });
                    if (close[index]) {
                        close[index].addEventListener('click', () => {
                            lists[index].classList.remove('jsShowCollapseMenu');
                            href.classList.remove('_active');
                        })
                    }
                    href.addEventListener('dblclick', (event) => {
                        event.preventDefault();
                        window.location.assign(href.href);
                        lists[index].classList.remove('jsShowCollapseMenu');
                        href.classList.remove('_active');
                    })
                })

            }
        })
    }
    headerShowMenuHandler();
    //TRASH_PAGE
    const trashLabels = document.querySelectorAll('.trash-page__label');
    trashLabels.forEach(label => {
        const input = label.querySelector('.trash-page__input');
        const max = input.getAttribute('max');
        const min = input.getAttribute('min');
        const plus = label.querySelector('.trash-page__plus');
        const minus = label.querySelector('.trash-page__minus');
        plus.addEventListener('click', () => {
            if ((+input.value + 1) > +max) {
                label.classList.add('_error');
            } else {
                ++input.value;
            }
        });
        minus.addEventListener('click', () => {
            if (input.value - 1 >= min) {
                --input.value;
                label.classList.remove('_error');
            }
        })
    })
//TRASH
    const trashButton = document.getElementById('trash');
    const mobileTrashButton = document.getElementById('mobile-trash');
    const mobileTrashBlock = document.querySelector('.mobile-navigation__item .trash');

    const trashBlock = document.querySelector('.trash');
    if (trashButton) trashButton.addEventListener('click', () => {
        trashBlock.classList.toggle('_active');
        trashBlock.querySelector('.close').onclick = () => trashBlock.classList.remove('_active');
    });
    if (mobileTrashButton) mobileTrashButton.addEventListener('click', () => {
        mobileTrashBlock.classList.toggle('_active');
        mobileTrashBlock.querySelector('.close').onclick = () => mobileTrashBlock.classList.remove('_active');
    })
//MOBILE MENU
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuToggleButton = document.querySelector('#menu');
    if (mobileMenuToggleButton) mobileMenuToggleButton.addEventListener('click', () => {
        const iconMenuMobile = mobileMenuToggleButton.querySelector('.mobile-navigation__icon');
        const translateItem = new TranslateClass(mobileMenu, 'top');
        iconMenuMobile.classList.toggle('jsAnimationCrossMenu');
        document.body.classList.toggle('overflowY-hidden');
        translateItem.toggle()
    });

    const mobileListBlockToggle = document.querySelectorAll('.mobile-menu__block_translate');
    mobileListBlockToggle.forEach(item => {
        const mobileMenuList = item.querySelector('.mobile-menu__list');
        const mobileMenuSubtitle = item.querySelector('.mobile-menu__subtitle');
        const subtitleClose = mobileMenuList.querySelector('.mobile-menu__subtitle');
        if (mobileMenuSubtitle && mobileMenu)
            mobileMenuSubtitle.addEventListener('click', () => {
                const translate = new TranslateClass(mobileMenuList, 'right');
                const mobileMenu = mobileMenuList.closest('.mobile-menu');
                translate.show();
                mobileMenu.classList.add('overflowY-hidden');
                subtitleClose.addEventListener('click', () => {
                    translate.hide();
                    mobileMenu.classList.remove('overflowY-hidden');
                })
            })
    })

    //SEARCH
    const searchInput = document.querySelector('#search');
    const clearInputButton = document.querySelector('.search__button_clear');
    const searchBlock = document.querySelector('.search');
    const searchModal = document.querySelector('.search-modal');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            if (event.target.value) {
                clearInputButton.classList.add('jsShowClearButton');
                searchBlock.classList.add('jsActiveSearch')
                searchModal.classList.add('jsShowModalSearch');
            } else {
                clearInputButton.classList.remove('jsShowClearButton');
                searchBlock.classList.remove('jsActiveSearch');
                searchModal.classList.remove('jsShowModalSearch');
            }
        })
        clearInputButton.addEventListener('click', () => {
            searchInput.value = "";
            clearInputButton.classList.remove('jsShowClearButton');
            searchBlock.classList.remove('jsActiveSearch')
        })
        searchInput.addEventListener('focus', (event) => {
            if (searchInput.value) {
                searchModal.classList.add('jsShowModalSearch');
            } else {
                searchModal.classList.remove('jsShowModalSearch');
            }
        })
        searchInput.addEventListener('blur', () => {
            searchModal.classList.remove('jsShowModalSearch');
        })
    }

    //MOBILE-SEARCH
    const mobileHeaderButton = document.querySelector('.mobile-header__button_search');
    const clearMobileSearchInputButton = document.querySelector('#mobileSearch-clear');
    const inputMobileSearch = document.querySelector('#mobile-search');
    const mobileHeaderSearch = document.querySelector('.mobile-header__search');
    const mobileModalSearch = document.querySelector('.mobile-header__modal');
    if (mobileHeaderButton) mobileHeaderButton.addEventListener('click', () => {
        mobileHeaderSearch.classList.remove('jsHideMobileSearch');
        mobileModalSearch.classList.remove('jsHideMobileSearch');

    })
    if (clearMobileSearchInputButton) clearMobileSearchInputButton.addEventListener('click', () => {
        if (inputMobileSearch.value) {
            inputMobileSearch.value = "";
        } else {
            mobileHeaderSearch.classList.add('jsHideMobileSearch');
            mobileModalSearch.classList.add('jsHideMobileSearch');

        }
    })

    //Catalog
    const closeCatalogButton = document.querySelector('.catalog__close');
    const catalogButton = document.querySelector('.header__catalog-button');
    const catalog = document.querySelector('.catalog');
    const mobileCatalogButton = document.querySelector('#catalog');
    if (catalogButton) catalogButton.addEventListener('click', () => {
        catalog.classList.add('jsShowCatalog');
        document.body.style.overflowY = "hidden";
    })
    if (closeCatalogButton) closeCatalogButton.addEventListener('click', () => {
        catalog.classList.remove('jsShowCatalog');
        document.body.style.overflowY = "unset";
    })
    if (mobileCatalogButton) mobileCatalogButton.addEventListener('click', () => {
        catalog.classList.add('jsShowCatalog');
        document.body.style.overflowY = "hidden";
    })
    //FOOTER
    const footerCollapseItems = document.querySelectorAll('.footer__block_mobile-collapse');
    footerCollapseItems.forEach(item => {
        const ul = item.querySelector('.footer__list');
        const collapse = new ItcCollapse(ul);
        item.onclick = () => {
            if (window.innerWidth <= '768') {
                collapse.toggle();
            }
        }
    })

    //HELP PAGE
    const settingsFromNavigation = {
        wrapperSelector: '.help__inner',
        navigationListSelector: '.help__points',
        activeSelector: '.jsActivePointMenu',
        foundTitle: true,
    }
    linkingNavigation(settingsFromNavigation);
    const listFAQ = document.querySelector('.help__faq-list');
    if (listFAQ) listFAQ.addEventListener('click', (event) => {
        if (event.target.classList.contains('help__faq-button') || event.target.closest('.help__faq-button')) {
            const collapsedItem = event.target.closest('.help__faq-item');
            const collapsedDrop = collapsedItem.querySelector('.help__faq-drop');
            const collapse = new ItcCollapse(collapsedDrop);
            event.target.closest('.help__faq-button').classList.toggle('jsActivePointMenu');
            collapse.toggle();
        }
    })
//ModalResultFilter
    const modalFilter = document.querySelector('.filter__drop');
    const inputsFilter = document.querySelectorAll('.filter__input');
    if (inputsFilter !== null) {
        let massiveCheckedItem = [];
        inputsFilter.forEach((item, index) => {
            item.addEventListener('input', (event) => {
                if (item.checked) {
                    massiveCheckedItem.push({
                        index: index,
                        item: item,
                        y: item.getBoundingClientRect().y - document.querySelector('.filter').getBoundingClientRect().y
                    });
                    modalFilter.style.top = `${massiveCheckedItem.at(-1).y}px`;
                    modalFilter.classList.add('_active');
                } else {
                    massiveCheckedItem = massiveCheckedItem.filter((item) => item.index !== index);
                    if (massiveCheckedItem.length === 0) {
                        modalFilter.classList.remove('_active');
                    } else {
                        modalFilter.style.top = `${massiveCheckedItem.at(-1).y || ''}px`;
                    }
                }

            })
        })
    }
    //FILTER
    const filterItems = document.querySelectorAll('.filter__block');
    const setLogicRangeSlider = (id, idInputFirst, idInputSecond, min, max) => {
        const rangeSliderFilter = document.getElementById(id);
        const input0 = document.getElementById(idInputFirst);
        const input1 = document.getElementById(idInputSecond);
        const inputs = [input0, input1];

        if (rangeSliderFilter) {
            noUiSlider.create(rangeSliderFilter, {
                start: [min, max],
                connect: true,
                step: 2,
                range: {
                    'min': [min],
                    'max': [max]
                }
            });

            rangeSliderFilter.noUiSlider.on('update', (values, handle) => {
                inputs[handle].value = Math.round(values[handle]);
            });

            const setRangeSlider = (i, value) => {
                let arr = [null, null];
                arr[i] = value;


                rangeSliderFilter.noUiSlider.set(arr);
            };

            inputs.forEach((el, index) => {
                el.addEventListener('change', (e) => {
                    setRangeSlider(index, e.currentTarget.value);
                });
            });
        }
    }
    setLogicRangeSlider('range-slider', 'input-0', 'input-1', 12, 123450);
    setLogicRangeSlider('range-slider-mobile', 'input-2', 'input-3', 12, 123450);

    if (filterItems) {
        filterItems.forEach(block => {
            const list = block.querySelector('.collapse');
            const button = block.querySelector('.filter__subtitle>.filter__button');
            setStateMoreList('.filter__item');
            if (list && button) {
                button.onclick = () => {
                    const collapse = new ItcCollapse(list);
                    collapse.toggle();
                };
            }
        })
    }
    const filterTitleModal = document.querySelector('.filter__title_mobile');
    if (filterTitleModal) {
        const mobile = document.querySelector('.filter_mobile');
        const shell = mobile.querySelector('.filter__shell');
        const filterCurrentBlock = document.querySelector('.filter__current-blocks');
        const filterSubtitle = shell.querySelectorAll('.filter__subtitle>.filter__button');
        filterTitleModal.addEventListener('click', () => {
            shell.classList.add('_active');
            document.body.classList.add('overflowY-hidden')
        })
        const toggleCloseFilter = (close) => {
            close.onclick = (event) => {
                if (!close.classList.contains('_active')) {
                    close.classList.remove('_active')
                    shell.classList.remove('_active');
                    document.body.classList.remove('overflowY-hidden');
                } else {
                    close.classList.remove('_active');

                }
            };
        }
        filterSubtitle.forEach(button => {
            const close = shell.querySelector('.filter__prev');
            const list = button.closest('.filter__block').querySelector('.collapse');
            const collapse = new ItcCollapse(list);
            toggleCloseFilter(close);
            button.onclick = () => {
                collapse.show();
                filterCurrentBlock.innerHTML = button.textContent;
                const mobile = document.querySelector('.filter_mobile');
                const shell = mobile.querySelector('.filter__shell');
                const close = shell.querySelector('.filter__prev');
                close.classList.add('_active');
                document.body.classList.add('overflowY-hidden');
                close.onclick = (event) => {
                    if (!close.classList.contains('_active')) {
                        close.classList.remove('_active')
                        shell.classList.remove('_active');
                        document.body.classList.remove('overflowY-hidden');
                    } else {
                        filterCurrentBlock.innerHTML = 'Фильтры';
                        collapse.hide();
                        close.classList.remove('_active');
                    }
                };
            };
        })
    }
    //VIEW-FILTER
    const viewFilter = document.querySelector('.view-filter__drop');
    const dropList = document.querySelector('.view-filter__drop-list');
    if (viewFilter) {
        viewFilter.addEventListener('click', (event) => {
            if (event.target.closest('.view-filter__drop-value')) {
                dropList.classList.add('jsShowViewFilter');
            }
        })
    }
    const layoutButton = document.querySelectorAll('.view-filter__button_layout');
    const subCategoryList = document.querySelector('.sub-category__list');

    let activeLayout = 'grid';
    const buttonLayout = document.querySelector(`.view-filter__button_layout[data-view=${activeLayout}]`);
    let activeLayoutItem = buttonLayout === null ? '' : buttonLayout.closest('.view-filter__item');
    if (layoutButton && subCategoryList && activeLayoutItem) {
        subCategoryList.classList.add(`sub-category__list_${activeLayout}`);

        layoutButton.forEach(item => {
            item.addEventListener('click', () => {
                const data = item.dataset.view;
                if (activeLayout !== data) {
                    subCategoryList.classList.remove(`sub-category__list_${activeLayout}`);
                    subCategoryList.classList.add(`sub-category__list_${data}`);
                    activeLayoutItem.classList.remove('_active');
                    const closest = item.closest('.view-filter__item');
                    if (closest) closest.classList.add('_active');
                    activeLayoutItem = closest;
                    activeLayout = data;
                }
            })
        });
    }

    //SUB-CATEGORY-TYPES
    const listOfTypes = document.querySelector('.sub-category__types');
    if (listOfTypes !== null) {
        listOfTypes.addEventListener('click', (event) => {
                if (event.target.classList.contains('sub-category__button')) {
                    const item = event.target.closest('.sub-category__type');
                    item.classList.add('_active');
                    const close = item.querySelector('.sub-category__close');
                    close.addEventListener('click', () => {
                            item.classList.remove('_active');
                        }
                    );
                }
            }
        );
    }
    //PRODUCT-BUTTON
    const dropdownDependencies = (clickedButtonSelector, dropDownSelector) => {
        let buttons = document.querySelectorAll(clickedButtonSelector);
        const dropDown = document.querySelector(dropDownSelector);
        const dropCloseSuccess = document.querySelector(`${dropDownSelector}_removed`);
        let dropSuccessClose, close;
        if (dropCloseSuccess && dropDown) {
            dropSuccessClose = dropCloseSuccess.querySelector('.dropdown-product__close');
            close = dropDown.querySelector('.dropdown-product__close');
        }

        if (buttons && dropDown) {
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    if (button.classList.contains('_active')) {
                        button.classList.remove('_active');
                        dropDown.classList.remove('_active');
                        dropCloseSuccess.classList.add('_active');
                        const ariaLabel = button.getAttribute('aria-label');
                        ariaLabel ? button.setAttribute('aria-label', 'Добавить в избранное') : '';
                        var timeoutCloseTwo = setTimeout(() => {
                            dropCloseSuccess.classList.remove('_active');
                        }, 2000);
                    } else {
                        dropCloseSuccess.classList.remove('_active');
                        dropDown.classList.add('_active');
                        button.classList.add('_active');
                        const ariaLabel = button.getAttribute('aria-label');
                        ariaLabel ? button.setAttribute('aria-label', 'Удалить из избранного') : '';
                        var timeoutCloseOne = setTimeout(() => {
                            dropDown.classList.remove('_active');
                        }, 2000);
                    }
                });
            })
        }
        if (close) close.addEventListener('click', () => {
            dropDown.classList.remove('_active');
        });
        if (dropCloseSuccess) dropSuccessClose.addEventListener('click', () => {
            dropCloseSuccess.classList.remove('_active');
        })
    }
    dropdownDependencies('.favourite-add', '.dropdown-product__favourite');
    dropdownDependencies('.trash-add', '.dropdown-product__trash');

    const productButtons = document.querySelectorAll('.product__item_more');
    const imageFullScreen = document.querySelector('.product__image');
    if (productButtons) {
        productButtons.forEach(item => {
            item.addEventListener('click', () => {
                item
                    .closest('.product__list')
                    .querySelectorAll('.product__item-collapse')
                    .forEach(element => {
                        element.classList.toggle('_show');
                    });
                item.classList.add('_hidden');
            });
        });
    }
    if (imageFullScreen !== null) {
        const fullScreen = imageFullScreen.querySelector('.product__full-screen');
        const close = imageFullScreen.querySelector('.product__full-screen_close');
        if (fullScreen) {
            fullScreen.addEventListener('click', () => {
                imageFullScreen.classList.add('_active');
                fullScreen.style.opacity = "0";
                fullScreen.style.visibility = "hidden";
                close.style.opacity = '1';
                close.style.visibility = "visible";
            });
        }
        if (close) {

            close.addEventListener('click', () => {
                imageFullScreen.classList.remove('_active');
                close.style.opacity = "0";
                close.style.visibility = "hidden";
                fullScreen.style.opacity = '1';
                fullScreen.style.visibility = "visible";
            })
        }
    }
//TOGGLE color selection
    const productListColor = document.querySelector('.product__list_color');
    const modalListColor = document.querySelector('.modal-color__list');
    if (productListColor) {
        let activeElement = productListColor.querySelector('._active') || modalListColor.querySelector('._active');

        productListColor.addEventListener('click', (event) => {
            const closest = event.target.closest('.product__item')
            if (closest && !closest.classList.contains('_active')) {
                activeElement.classList.remove('_active');
                activeElement = closest;
                closest.classList.add('_active');

            }
        });
        modalListColor.addEventListener('click', (event) => {
            const closest = event.target.closest('.modal-color__item')
            if (closest && !closest.classList.contains('_active')) {
                activeElement.classList.remove('_active');
                activeElement = closest;
                closest.classList.add('_active');

            }
        });
    }
    if (modalListColor) {
        modalListColor.addEventListener('click', (event) => {
            const closest = event.target.closest('.modal-color__item')
            if (closest && !closest.classList.contains('_active')) {
                activeElement.classList.remove('_active');
                activeElement = closest;
                closest.classList.add('_active');

            }
        });
    }
    const productList = document.querySelectorAll('.product__list');
    if (productList) {
        productList.forEach(list => {
            if (!list.classList.contains('product__list_color')) {
                let activeElement = list.querySelector('._active');
                list.addEventListener('click', (event) => {
                    const closest = event.target.closest('.product__item')
                    if (closest && !closest.classList.contains('_active') && !closest.classList.contains('product__item_more')) {
                        activeElement.classList.remove('_active');
                        activeElement = closest;
                        closest.classList.add('_active');

                    }
                })
            }
        })
    }
//COPY LINK NOTIFICATION
    const notificationCopyButton = document.querySelector('.product__soc-link_copy');
    if (notificationCopyButton) {
        notificationCopyButton.addEventListener('click', () => {
            const notification = document.querySelector('.notification-copy');
            notification.classList.add('_active');
            setTimeout(() => {
                notification.classList.remove('_active');
            }, 2000);
        })
    }
    setModalDependencies('.modal-color', '.product__button_color');
    setModalDependencies('.auth-modal', '.auth-show');
    setModalDependencies('.purchase-order', '.purchase-show');
    setModalDependencies('.modal-click', '.one-click-show');
    setModalDependencies('.cancellation', '.order__cancel');
    setModalDependencies('.delete-modal', '.delete-all');
    setModalDependencies('.ordering-modal', '.auth-open');
    const cancelDeleteModalButton = document.querySelector('.delete-modal__button_cancel');
    if (cancelDeleteModalButton) {
        cancelDeleteModalButton.addEventListener('click', () => {
            document.querySelector('.delete-modal').classList.remove('_active');
        })
    }
    const shareButtons = document.querySelectorAll('.product__ability_share');
    const socLinksList = document.querySelectorAll('.product__soc-links');
    if (shareButtons && socLinksList) {
        shareButtons.forEach((item, index) =>
            item.addEventListener('click', () => {
                socLinksList[index].classList.toggle('_active');
            })
        )

    }
    const productTrash = document.querySelector('.product__button_trash');
    const notificationAddDrop = document.querySelector('.dropdown-product__trash');
    const notificationRemoveDrop = document.querySelector('.dropdown-product__trash_removed');
    if (productTrash) {
        const addProduct = document.querySelector('.product__add-product');
        const plus = document.querySelector('.product__plus');
        const minus = document.querySelector('.product__minus');
        const input = document.querySelector('.product__input');
        productTrash.addEventListener('click', (event) => {
            addProduct.classList.add('_active');
            notificationRemoveDrop.classList.remove('_active');
            notificationRemoveDrop.classList.remove('_active');
            notificationAddDrop.classList.add('_active');
        });
        plus.addEventListener('click', (event) => {
            event.stopPropagation();
            ++input.value;
        });
        minus.addEventListener('click', (event) => {
            event.stopPropagation();
            if (input.value < 2) {
                addProduct.classList.remove('_active');
                input.value = 1;
                notificationAddDrop.classList.remove('_active');
                notificationRemoveDrop.classList.add('_active');
            } else {
                --input.value;
            }

        });
        input.addEventListener('input', () => {
            if (input.value < 1 && input.value !== "") {
                addProduct.classList.remove('_active');
                input.value = 1;
                notificationAddDrop.classList.remove('_active');
                notificationRemoveDrop.classList.add('_active');
            }
        });
    }
//MY ORDERS
    const settingsMyOrders = {
        wrapperSelector: '.my-orders__linking-list',
        navigationListSelector: '.my-orders__sections',
    }
    linkingNavigation(settingsMyOrders);
    const myOrderLists = document.querySelectorAll('.my-orders__list');
    if (myOrderLists) {
        myOrderLists.forEach(myOrders => {
            myOrders.addEventListener('click', (event) => {
                event.stopPropagation();
                const closest = event.target.closest('.my-orders__shell');
                if (closest) {
                    closest.classList.toggle('_active');
                    closest.closest('.my-orders__item').querySelector('.my-order').classList.toggle('_active');
                }
            })
        })
    }
//ORDERING
    const settingsOrdering = {
        wrapperSelector: '.ordering__tap-blocks_contact',
        navigationListSelector: '.ordering__types[data-block="contact"]',

    };
    const settingOrderingGet = {
        wrapperSelector: '.ordering__tap-blocks_getting',
        navigationListSelector: '.ordering__types[data-block="getting"]',

    }
    linkingNavigation(settingsOrdering);
    linkingNavigation(settingOrderingGet);
    const orderingButtons = document.querySelectorAll('.ordering__next');
    let orderingChangeButtons;
    if (orderingButtons) {
        orderingChangeButtons = document.querySelectorAll('.ordering__change');
    }
    const allSectionOrdering = document.querySelectorAll('.ordering__section');
    if (allSectionOrdering) {
        const size = allSectionOrdering.length;
        let count = 0;
        allSectionOrdering.forEach(section => {
            if (section.classList.contains('_success')) {
                count++;
            }
        })
        if (count === size) {
            const submit = document.querySelectorAll('.ordering__submit');
            const personal = document.querySelector('.ordering__personal');
            if (submit) {
                submit.forEach(sub => {
                    if (!sub.classList.contains('ordering__submit_mobile')) {
                        sub.classList.add('_active');
                    }
                })
            }
            if (personal) personal.classList.add('_active');
        }
    }
    if (orderingButtons) {
        orderingButtons.forEach(button => {
            button.addEventListener('click', () => {
                const data = button.dataset.block;
                const parent = button.closest('.ordering__section');
                const shell = parent.querySelector('.ordering__shell');
                shell.classList.remove('collapse_show');
                parent.classList.remove('_active');
                parent.classList.add('_success');
                parent.classList.remove('_focused');
                const nextElement = document.querySelector(`.ordering__section[data-block=${data}]`);
                if (nextElement.classList.contains('_success')) {
                    const nextEl = nextElement.querySelector('.ordering__next');
                    if (nextEl) {
                        const nextData = nextEl.dataset.block;
                        const elementNext = document.querySelector(`.ordering__section[data-block=${nextData}]`);
                        elementNext.classList.add('_active');
                    }

                } else {
                    nextElement.classList.add('_active');
                }
            })
        })
    }
    if (orderingChangeButtons) {
        orderingChangeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const data = button.dataset.block;
                const element = document.querySelector(`.ordering__section[data-block=${data}]`);
                const activeElement = document.querySelector('.ordering__section._active');
                const focusedElement = document.querySelector('.ordering__section._focused');
                if (activeElement) {
                    activeElement.classList.remove('_active');
                }
                if (focusedElement) {
                    focusedElement.classList.remove('_focused');
                }
                element.classList.add('_active')
                element.classList.add('_focused')
            })
        })
    }
    const toggleChoice = (wrapperSelector, listSelector, isResultChoice) => {
        const wrapper = document.querySelector(wrapperSelector);
        if (wrapper) {
            let activeElement = wrapper.querySelector('.choice._active') || '';
            if (wrapper) wrapper.querySelector(listSelector).addEventListener('click', (event) => {
                event.stopPropagation();
                const closest = event.target.closest('.choice');
                if (event.target.classList.contains('choice') || closest) {

                    if (activeElement.classList && activeElement.classList.contains('_active')) {
                        activeElement.classList.remove('_active');
                        activeElement = '';
                    }
                    if (isResultChoice) {
                        const parent = closest.closest('.ordering__section');
                        parent.classList.add('_success');
                        const submit = document.querySelectorAll('.ordering__submit');
                        const personal = document.querySelector('.ordering__personal');
                        if (submit) {
                            submit.forEach(sub => {
                                if (!sub.classList.contains('ordering__submit_mobile')) {
                                    sub.classList.add('_active');
                                }
                            })
                        }
                        if (personal) personal.classList.add('_active');
                        closest.classList.add('_active');
                    } else {
                        closest.classList.toggle('_active');
                    }
                    activeElement = closest;
                }
            })
        }
    }
    toggleChoice('.linking-block[data-block="self-delivery"]', '.ordering__data', false);
    toggleChoice('.ordering__section[data-end="true"]', '.ordering__choices', true);

    const orderingProductsWrapper = document.querySelector('.ordering__orders[data-block=products]');
    let orderingProductsButton;
    if (orderingProductsWrapper) {
        orderingProductsButton = orderingProductsWrapper.querySelector('.ordering__subtitle')
    }
    if (orderingProductsWrapper) orderingProductsButton.addEventListener('click', () => {
        const list = orderingProductsWrapper.querySelector('.ordering__products');
        orderingProductsButton.classList.toggle('_active');
        const collapse = new ItcCollapse(list);
        collapse.toggle();
    })
//Auth ordering
    const authOrderChangeButtons = document.querySelectorAll('.ordering__auth-change');
    if (authOrderChangeButtons) {
        authOrderChangeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const parent = button.closest('.ordering__section');
                const auth = parent.querySelector('.auth-block');
                const shell = parent.querySelector('.auth-hidden');
                shell.classList.remove('auth-hidden');
                auth.classList.add('auth-hidden');
            })
        })
    }

//SYSTEM NOTIFICATION
    const closeSystemNotification = document.querySelector('.system-notification__close');
    closeSystemNotification.addEventListener('click', () => {
        const block = document.querySelector('.system-notification');
        block.classList.remove('_active');
    })
    window.onclick = (event) => {
        if (!event.target.classList.contains('navigation__href_collapse')) {
            const menu = document.querySelectorAll('.jsShowCollapseMenu');
            event.target.classList.remove('_active');
            if (menu) menu.forEach(item => item.classList.remove('jsShowCollapseMenu'))
        }
        if (!event.target.closest('.view-filter__drop-value')) {
            if (dropList) {
                dropList.classList.remove('jsShowViewFilter');
            }
        }
        if (!event.target.closest('.popup-user') && !event.target.closest('.menu__button_auth')) {
            document.querySelector('.popup-user') ? document.querySelector('.popup-user').classList.remove('_active') : '';
        }
        if (event.target.classList.contains('modal__backdrop')) {
            event.target.closest('.modal') ? event.target.closest('.modal').classList.remove('_active') : '';
            document.body.classList.remove('overflowY-hidden')

        }
        if (modalFilter && !event.target.closest('.filter__drop')) {
            modalFilter.classList.remove('_active');
            document.body.classList.remove('overflowY-hidden')
        }
    };


    document.querySelectorAll('.tel').forEach(input => {
        let keyCode;

        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            const pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___-__-__",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i !== -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");

            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5) this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });

    function initMap() {
        const center = [53.530879597776945, 49.37541251421326];
        let map = new ymaps.Map('map', {
            center: center,
            zoom: 12,
        })

        const createContentPlaceMark = (title) => {
            return ymaps.templateLayoutFactory.createClass(`
                    <div class="address__location">
                    <div class="address__image_location" style="background-image: url('images/map-point.svg');
                      background-position: center center;
                      background-repeat: no-repeat;">
                                        </div>
                        <div class="address__hint">
                        ${title}
                        </div>
                    </div>
                    `);
        }
        const settingsPlaceMark = {
            iconImageSize: [32, 32],
            iconImageOffset: [0, 0],
        }
        let firstPlaceMark = new ymaps.Placemark([53.5340680709736, 49.44342599999999], {}, {
            iconLayout: createContentPlaceMark('ул. Борковская, 53'),
            ...settingsPlaceMark
        });

        let secondPlaceMark = new ymaps.Placemark([53.549954570927355, 49.288268999999886], {}, {
            iconLayout: createContentPlaceMark('ул. Ларина, 141'),
            ...settingsPlaceMark
        });
        map.controls.remove('geolocationControl');
        map.controls.remove('searchControl');
        map.controls.remove('trafficControl');
        map.controls.remove('typeControl');
        map.controls.remove('fullscreenControl');
        map.controls.remove('zoomControl');
        map.controls.remove('rulerControl');
        map.controls.remove('scrollZoom');

        map.geoObjects.add(firstPlaceMark);
        map.geoObjects.add(secondPlaceMark);

    }

    if (document.querySelector('.address__map')) {
        ymaps.ready(initMap);
    }

}

