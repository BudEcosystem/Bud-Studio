import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { UpArrow } from "../../../OmniSearch/Panel/PanelOption/PanelSvgIcons";
import { Folder, WhiteFolder, Page } from "./TreeSvgIcons";
import "./Tree.css"

function Tree({ data = [], setShowColorDots, showDocumentOptions, setShowDocumentOptions}: any) {
  const [activeNode, setActiveNode] = useState(null);

  const handleNodeClick = (node) => {
    if (activeNode === node) {
      setActiveNode(null);
    } else {
      setActiveNode(node);
    }
  };
  return (
    <div className="treeViewContainer">
      <ul className="treeViewList">
        {data.map((tree: any, i) => (
          <TreeNode
            key={tree.id}
            node={tree}
            isFirst={i === i}
            isVisible = {tree.filterApplied ? tree.searchMatch : true}
            isActive={activeNode === tree}
            onClick={handleNodeClick}
            activeNode
            showDocumentOptions={showDocumentOptions}
            setShowDocumentOptions={setShowDocumentOptions}
            setShowColorDots={setShowColorDots}
          />
        ))}
      </ul>
    </div>
  );
}

function TreeNode({ node, isFirst, isActive, onClick, activeNode,isVisible, showDocumentOptions, setShowDocumentOptions, setShowColorDots }: any) {
  const [childVisible, setChildVisiblity] = useState(!node.isParent);
  const {workspace}:any = useSelector(state=>state)
  let { color } = workspace
  const hasChild = !!node.children;

  const isParentStyle = {
    background: `linear-gradient(90.28deg, ${`${color}20`} 4.88%, rgba(17, 21, 18, 0) 91.54%)`,
    borderRadius: '10px',
    cursor: 'pointer',
    '::after': 'border-bottom: 0px',
  };
  const toggleChildVisibility = () => {
    node.isParent ? setChildVisiblity((v) => !v) : setChildVisiblity(true);
    onClick(node);
  };

  const showFlyOut = (e: any) => {
    e.stopPropagation()
    setShowDocumentOptions(!showDocumentOptions);
    setShowColorDots(false)
  }
  return (
    isVisible && (    <li className="treeLiItem">
      <div
        className={`treeList${isFirst ? ' first' : ''}`}
        style={node.isParent && childVisible ? isParentStyle : {}}
        onClick={toggleChildVisibility}
      >
        {hasChild && node.isParent && (
          <div className={`arrow ${childVisible ? 'active' : ''}`}>
            <UpArrow stroke={`${childVisible ? color : '#7B8388'}`} />
          </div>
        )}
        <div className="folderImgContainer">
          {childVisible && node.isParent ? (
            <Folder fill={color} stroke={color} />
          ) : !childVisible && node.isParent ? (
            <WhiteFolder />
          ) : (
            <Page />
          )}
        </div>

        <div className="treeLabel">{node.label}</div>

        {childVisible && node.isParent && <div onClick={showFlyOut} className="plus">+</div>}
      </div>
      {hasChild && childVisible && (
        <div className={`treeChildLabel${childVisible ? ' show' : ''}`}>
          <ul className="treeChildLabelUl">
            {/* <Tree data={node.children} color={color} /> */}
            {node.children.map((child, index) => (
              <TreeNode
                key={child.id}
                node={child}
                isFirst=""
                isVisible = {child.filterApplied ? child.searchMatch : true}
                isActive={activeNode === child}
                onClick={onClick}
                activeNode
                showDocumentOptions={showDocumentOptions}
                setShowDocumentOptions={setShowDocumentOptions}
                setShowColorDots={setShowColorDots}
              />
            ))}
          </ul>
        </div>
      )}
    </li>)
  );
}

export default Tree;
