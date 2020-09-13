window.dom = {
    create(string){
        const container = document.createElement("template");
        //这里用template标签代替div,这样才能容纳任意标签
        container.innerHTML = string.trim();
        //trim()可以去除空格
        return container.content.firstChild;
        //template需要加个content才能读取
    },//用于创造任意一个元素

    after(node,node2){
        node.parentNode.insertBefore(node2,node.nextSibling)
        //将node2插到node的后面,由于api的缺失只能绕一圈,非常反人类
    },

    before(node,node2){
        node.parentNode.insertBefore(node2,node);
    },

    append(parent,node){
        parent.appendChild(node);
    },//新增儿子,append:增加

    warp(node,parent){
        dom.before(node,parent);
        dom.append(parent,node);
    },//新增爸爸

    remove(node){
        // node.remove();新api IE可能不支持
        node.parentNode.removeChild(node);
        return node;
    },
    
    empty(node){
        const {childNodes} = node
        //const childNodes = node.chilNodes的简写
        const array = []
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            //remove会返回自己
            x = node.firstChild;
        }
        return array;
    },//删除后代

    attr(node, name, value){ // js只能这么重载
        if(arguments.length === 3){
            node.setAttribute(name,value);
        }else if(arguments.length === 2){
            return node.getAttribute(name);
        }
    },//修改node的某项属性

    text(node, string){
        if(arguments.length === 2){
            if('innerText' in node){//适配
                node.innerHTML = string; 
            }else{
                node.textContent = string 
            }
        }else if(arguments.length === 1){
            if('innerText' in node){//适配
                return node.innerHTML; 
            }else{
                return node.textContent; 
            }
        }
    },

    html(node,string){
        if(arguments.length === 2){
            node.innerHTML = string;
        }else if(arguments.length === 1){
            return node.innerHTML;
        }
    },

    style(node,name,value){
        if(arguments.length === 3){
            //dom.style(div,'color','red')
            node.style[name] = value;
        }else if(arguments.length === 2){
            //dom.style(div,'color')
            return node.style[name];
        }else if(name instanceof Objcet){//检测name属性是不是在Objcet的原型链里
            for(let key in name){
                node.style[key] = object[key];
                // for in语句循环遍历数组
            }
        }
    },

    class: {
        add(node,className){
            node.classList.add(className);
        },
        remove(node,className){
            node.classList.remove(className);
        },
        has(node,className){
            return node.classList.contains(className);
        },
    },

    on(node, eventName, fn){
        node.addEventListner(eventName,fn)
    },
    off(node, eventName, fn){
        node.removeEventListner(eventName,fn)
    },//添加事件监听
    find(selector,scope){
        return (scope || document).querySelectorAll(selector);
    },//|| 短路逻辑:取遇到的第一个真值或者最后面的值
    parent(node){
        return node.parentNode;
    },
    children(node){
        return node.children;
    },
    siblings(node){
        return Array.from(node.parentNode.children).filter(n=>n!==node);
        //filter过滤自己
    },
    next(node){
        let x = node.nextSibling;
        while(x && x.nodeType === 3){//1是节点,3是文本
            x = x.nextSibling;
        }  
        return x;
    },
    previous(node){
        let x = node.previousSibling;
        while(x && x.nodeType === 3){//1是节点,3是文本
            x = x.previousSibling;
        }  
        return x;
    },
    each(nodeList,fn){
        for(let i=0;i<nodeList.length;i++){
            fn.call(null,nodeList[i]);
        }
    },
    index(node){
        const list = dom.children(node.parentNode)
        let i;
        for(i=0;i<list.length;i++){
            if(list[i] === node){
                break;
            }
        }
        return i;
    }
};

//增删改查
