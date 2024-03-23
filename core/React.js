

function createTextNode (text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: []
    }
  }
}

function createElement(type, props, ...children) {
  console.info('children====>', children);
  return {
    type,
    props: {
      ...props,
      children: children.map((child) => {
        return typeof child === 'string' ? createTextNode(child) : child
      })
    }

  }
}

/**
 * 
 * @param {*} el { type: 'TEXT_ELEMENT', props: { id: 'id-learn', children: [...] }, 'value' }
 * @param {*} container El
 */
function render(el, container) {
  console.info('container====>', container);
  const dom = el.type === 'TEXT_ELEMENT' ? document.createTextNode('') : document.createElement(el.type)

  // 给元素加上属性
  Object.keys(el.props).forEach((key) => {
    if (key !== 'children') {
      dom[key] = el.props[key]
    }
  })

  // 递归处理children
  const children = el.props.children || []
  children.forEach((child) => {
    render(child, dom)
  })

  // 挂载dom
  container.append(dom)
}


const React = {
  render,
  createElement,
}


export default React