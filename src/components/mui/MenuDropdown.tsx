import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu, MenuListboxSlotProps, MenuProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton, MenuButtonProps } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, MenuItemProps } from '@mui/base/MenuItem';
import { useTheme } from '@mui/system';
import { PopupContext } from '@mui/base/Unstable_Popup';
import { CssTransition } from '@mui/base/Transitions';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

const resolveSlotProps = (fn: any, args: any) =>
    typeof fn === 'function' ? fn(args) : fn;

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
      <BaseMenu
          ref={ref}
          {...props}
          slots={{
            listbox: Listbox,
          }}
          slotProps={{
            ...props.slotProps,
            root: (ownerState) => {
              const resolvedSlotProps = resolveSlotProps(
                  props.slotProps?.root,
                  ownerState,
              );
              return {
                ...resolvedSlotProps,
                className: clsx(
                    `${isDarkMode ? 'dark' : ''} z-10`,
                    resolvedSlotProps?.className,
                ),
              };
            },
            listbox: (ownerState) => {
              const resolvedSlotProps = resolveSlotProps(
                  props.slotProps?.listbox,
                  ownerState,
              );
              return {
                ...resolvedSlotProps,
                className: clsx(
                    'text-sm box-border font-sans p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 min-w-listbox shadow-md dark:shadow-slate-900 [.open_&]:opacity-100 [.open_&]:scale-100 transition-[opacity,transform] [.closed_&]:opacity-0 [.closed_&]:scale-90 [.placement-top_&]:origin-bottom [.placement-bottom_&]:origin-top',
                    resolvedSlotProps?.className,
                ),
              };
            },
          }}
      />
  );
});

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
    (props, ref) => {
      const { className, ...other } = props;
      return (
          <BaseMenuButton
              ref={ref}
              className={clsx(
                  'cursor-pointer text-sm font-sans box-border rounded-lg font-semibold px-4 py-2 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-200 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none shadow-sm',
                  className,
              )}
              {...other}
          />
      );
    },
);

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { className, ...other } = props;
  return (
      <BaseMenuItem
          ref={ref}
          className={clsx(
              'list-none p-2 rounded-lg cursor-default select-none last-of-type:border-b-0 focus:shadow-outline-purple focus:outline-0 focus:bg-slate-100 focus:dark:bg-slate-800 focus:text-slate-900 focus:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700',
              className,
          )}
          {...other}
      />
  );
});

const Listbox = React.forwardRef(function Listbox(
    props: MenuListboxSlotProps,
    ref: React.ForwardedRef<HTMLUListElement>,
) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
        'The `Listbox` component cannot be rendered outside a `Popup` component',
    );
  }

  const verticalPlacement = popupContext.placement.split('-')[0];

  return (
      <CssTransition
          className={`placement-${verticalPlacement}`}
          enterClassName="base--expanded"
      >
        <ul {...other} ref={ref}/>
      </CssTransition>
  );
});

export { MenuButton, Menu, MenuItem }
