/**
 * docs-custom.js
 *
 * Demonstration of the FRONTEND_JS_URL feature.
 * This script adds a custom menu after the language picker in the header.
 *
 * To use this feature:
 * 1. Set the FRONTEND_JS_URL environment variable to point to this file
 *    Example: FRONTEND_JS_URL=https://antolc.github.io/docs-customized/docs-custom/public/docs-custom.js
 * 2. The script will be loaded in the <head> section at runtime
 */

(function () {
  'use strict';

  // Wait for the DOM to be ready
  function initCustomMenu() {
    // Check if we already added the custom menu to avoid duplicates
    if (document.getElementById('docs-custom-menu')) {
      console.log('[docs-custom] Custom menu already exists');
      return true;
    }

    // Create the custom menu
    const customMenu = document.createElement('div');
    customMenu.id = 'docs-custom-menu';
    customMenu.style.cssText = `
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    `;

    // Create the dropdown button
    const menuButton = document.createElement('button');
    menuButton.id = 'docs-custom-menu-button';
    menuButton.setAttribute('aria-label', 'Custom menu');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.style.cssText = `
      background: transparent;
      border: none;
      border-radius: var(--c--globals--spacings--st, 0.5rem);
      padding: 0.5rem 0.6rem;
      cursor: pointer;
      transition: all 0.3s ease-out;
      display: flex;
      align-items: center;
      gap: 0.2rem;
      color: var(--c--contextuals--content--palette--brand--primary, #0088ce);
      font-family: inherit;
      font-size: 1rem;
    `;
    menuButton.innerHTML = `
      <span class="material-icons" style="font-size: 1.5rem;">menu</span>
      <span>Menu</span>
    `;

    // Create the dropdown content
    const menuDropdown = document.createElement('div');
    menuDropdown.id = 'docs-custom-menu-dropdown';
    menuDropdown.style.cssText = `
      position: absolute;
      top: calc(100% + 0.5rem);
      right: 0;
      background: var(--c--theme--colors--greyscale-000, #ffffff);
      border-radius: var(--c--globals--spacings--st, 0.5rem);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      min-width: 200px;
      z-index: 1000;
      display: none;
      flex-direction: column;
      padding: 0.5rem 0;
    `;

    // Menu items with links
    const menuItems = [
      {
        label: 'Documentation',
        url: 'https://docs.lasuite.numerique.gouv.fr/',
        icon: 'description',
      },
      {
        label: 'GitHub',
        url: 'https://github.com/suitenumerique/docs',
        icon: 'code',
      },
      {
        label: 'Support',
        url: 'https://aide.lasuite.numerique.gouv.fr/',
        icon: 'support',
      },
      { label: 'About', url: '#about', icon: 'info' },
    ];

    menuItems.forEach((item) => {
      const link = document.createElement('a');
      link.href = item.url;
      link.target = item.url.startsWith('http') ? '_blank' : '_self';
      link.rel = item.url.startsWith('http') ? 'noopener noreferrer' : '';
      link.style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        color: var(--c--theme--colors--greyscale-900, #333333);
        text-decoration: none;
        transition: background-color 0.2s ease;
        font-size: 0.95rem;
      `;
      link.innerHTML = `
        <span class="material-icons" style="font-size: 1.25rem; color: var(--c--contextuals--content--palette--brand--primary, #0088ce);">${item.icon}</span>
        <span>${item.label}</span>
      `;

      // Hover effect
      link.addEventListener('mouseenter', () => {
        link.style.backgroundColor =
          'var(--c--theme--colors--greyscale-100, #f5f5f5)';
      });
      link.addEventListener('mouseleave', () => {
        link.style.backgroundColor = 'transparent';
      });

      menuDropdown.appendChild(link);
    });

    // Toggle dropdown visibility
    menuButton.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = menuDropdown.style.display === 'flex';
      menuDropdown.style.display = isOpen ? 'none' : 'flex';
      menuButton.setAttribute('aria-expanded', !isOpen);

      // Add hover effect to button
      if (!isOpen) {
        menuButton.style.backgroundColor =
          'var(--c--theme--colors--greyscale-100, #f5f5f5)';
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!customMenu.contains(e.target)) {
        menuDropdown.style.display = 'none';
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.style.backgroundColor = 'transparent';
      }
    });

    // Add hover effect to button
    menuButton.addEventListener('mouseenter', () => {
      menuButton.style.backgroundColor =
        'var(--c--theme--colors--greyscale-100, #f5f5f5)';
    });
    menuButton.addEventListener('mouseleave', () => {
      if (menuDropdown.style.display !== 'flex') {
        menuButton.style.backgroundColor = 'transparent';
      }
    });

    // Assemble the custom menu
    customMenu.appendChild(menuButton);
    customMenu.appendChild(menuDropdown);

    // Insert the custom menu after the language picker's parent container
    const headerContainer = document.querySelector(
      '.--docs--header-block-right',
    );
    if (headerContainer) {
      headerContainer.append(customMenu);
      console.log(
        '[docs-custom] Custom menu successfully added inside header block right',
      );
      return true;
    } else {
      console.warn(
        '[docs-custom] Could not find proper insertion point for custom menu',
      );
      return false;
    }
  }

  // Try to initialize the menu, with retries in case the DOM isn't ready
  let attempts = 0;
  const maxAttempts = 50;
  const retryInterval = 100; // ms

  function tryInit() {
    attempts++;

    if (initCustomMenu()) {
      console.log('[docs-custom] Custom menu initialized successfully');
    } else if (attempts < maxAttempts) {
      setTimeout(tryInit, retryInterval);
    } else {
      console.error(
        '[docs-custom] Failed to initialize custom menu after ' +
          maxAttempts +
          ' attempts',
      );
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', tryInit);
  } else {
    tryInit();
  }
})();
