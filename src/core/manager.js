import React from 'react';
import ReactDOM from 'react-dom';
import browser from 'webextension-polyfill';
import { BehaviorSubject, Observable } from 'rxjs';
import Popup from '../components/root/popup-content';

import axios from 'axios';

// Background state
export const tabs = {};
const producers = {};

export default function manager(urlFilters) {



  //  Handlers

  function handleRequests(networkRequest) {

  }

  // Browser Activities

  function onUpdated(tabId, info, newState) {
    if (info.status === 'loading') {
      tabs.activeId = tabId;
      producers[tabId] = getInitialProducer(tabId);
      tabs[tabId] = {};
      setBadge("",tabId);
    }
  }

  function renderPopup(container) {
    return Observable.create(() => {
      const producer = getProducer(tabs.activeId);
      ReactDOM.render(
        <Popup info={producer} />, container
      );
      return () => {
        ReactDOM.unmountComponentAtNode(container);
      };
    });
  }

  function initializeTabs() {
    browser.tabs.query({})
      .then(found => {
        for (var i in found) {
          producers[found[i].id] = getProducer(found[i].id);
          tabs[found[i].id] = {};
        }
      });
    browser.tabs.query({ active: true })
      .then(t => {
        tabs.activeId = t[0].id;
      });
  }

  browser.webRequest.onCompleted.addListener(handleRequests, { urls: ["*://www.myexampledomain.com/*"] });
  browser.tabs.onActivated.addListener((info) => { tabs.activeId = info.tabId; if (tabs[tabs.activeId]) tabs.activeTab = tabs[tabs.activeId].tab });
  browser.tabs.onUpdated.addListener(onUpdated);
  browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
    delete tabs[tabId];
    delete producers[tabId];
  });

  initializeTabs();
  return { renderPopup, getProducer };
}

function setBadge(text, tabId) {
  browser.browserAction.setBadgeText({
    tabId: tabId ? tabId : tabs.active,
    text
  });
}

export function getProducer(tabId) {
  let producer = producers[tabId];

  if (!producer) {
    producer = new BehaviorSubject();
    producers[tabId] = producer;
  }

  return producer;
}

