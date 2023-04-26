import { sleep } from '@/utils/common';

/**
 * 向指定 父元素 中添加 子元素
 * @param {String} tagName 子元素标签名称
 * @param {String} innerHTML 子元素的内容
 * @param {Object} options 子元素的属性
 * @param {HTMLElement} parentNode 父元素，默认为 body
 * @param {HTMLElement} neighborNode 邻居子元素，若指定则在该子元素之前插入
 * @return {HTMLElement} element 创建的新元素
 */
const addElement = (
  tagName: string,
  innerHTML = '',
  options = {},
  parentNode = document.body,
  neighborNode: HTMLElement | null = null
) => {
  const element = document.createElement(tagName);
  element.innerHTML = innerHTML;
  Object.assign(element, options);
  if (neighborNode) {
    parentNode.insertBefore(element, neighborNode);
  } else {
    parentNode.appendChild(element);
  }
  return element;
};

const getElement = async (selector: string) => {
  let element = document.querySelector(selector);
  while (element === undefined || element === null) {
    console.info(`Waiting for '${selector}' to be available...`);
    await sleep(100);
    element = document.querySelector(selector);
  }
  return element;
};

// noinspection JSUnusedGlobalSymbols
const getElementAll = async (selector: string) => {
  let elements = document.querySelectorAll(selector);
  while (elements.length === 0) {
    console.info(`Waiting for '${selector}' to be available...`);
    await sleep(100);
    elements = document.querySelectorAll(selector);
  }
  return elements;
};

export { addElement, getElement, getElementAll };
