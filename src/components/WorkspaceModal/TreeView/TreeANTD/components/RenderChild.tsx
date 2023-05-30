/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FileFilled, FolderFilled, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Popover } from 'antd';
import {
  Copy,
  Delete,
  Duplicate,
  Edit,
  Move,
  Plus,
  RightArrow,
} from 'components/WorkspaceModal/WorkspaceIcons';
import { createSubChild } from 'redux/slices/workspace';

function RenderChild({
  node,
  treeData,
  optionModalRef,
  expandedKeys,
  addInputField,
  setExpandedKeys,
  workspaceDetails,
}: any) {
  const [currentNode, setCurrentNode] = useState<any>();
  const getParentIds = (
    arr: any,
    targetId: any,
    parentIds = [],
    parentId = null
  ): any => {
    for (const obj of arr) {
      if (obj.key === targetId) {
        if (parentId !== null) {
          parentIds.push(parentId);
        }
        return parentIds;
      }
      if (obj.children.length > 0) {
        parentIds.push(obj.key);
        const result = getParentIds(obj.children, targetId, parentIds, obj.key);
        if (result.length > 0) {
          return result;
        }
        parentIds.pop();
      }
    }
    return [];
  };
  const createNewClickHandler = (e, type: any, node) => {
    e.preventDefault();
    const { key } = node;
    addInputField(node, type);
    // if (type === 'doc') {
    //   setCreateDocFlag(true);
    // }
    // if (type === 'folder') {
    //   setCreateFolderFlag(true);
    // }
    // dispatch(enableCreateNewTreeNode({ type }));
    // setShowColorDots(false);
  };
  const content = (
    <div className="docOptionsModal" ref={optionModalRef}>
      <div className="secondWorkspaceModal">
        <div className="secondWorkspaceOptions">
          <div style={{ marginBottom: '20px' }}>
            <div
              className="secondWorkspaceOption"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Plus />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Create New
              </h3>
              <ul className="subMenu">
                <li onClick={(e) => createNewClickHandler(e, 'folder', node)}>
                  Folder
                </li>
                <li onClick={(e) => createNewClickHandler(e, 'doc', node)}>
                  Document
                </li>
              </ul>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            {/* {createPopup && <CreatePopupModal />} */}
            <div className="secondWorkspaceOption" onClick={() => {}}>
              <Edit />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Rename
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            {/* <div>
              {isRename && (
                <input
                  type="text"
                  value={newName}
                  onKeyUp={workSpaceNameChangeHandler}
                  onInput={workSpaceNameInputHandler}
                />
              )}
            </div> */}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div className="secondWorkspaceOption" onClick={() => {}}>
              <Duplicate />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Duplicate Folder
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption">
              <Copy />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Copy to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
            <div className="secondWorkspaceOption">
              <Move />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Move to
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>

          <div className="Delete">
            <div className="secondWorkspaceOption">
              <Delete />
              <h3
                style={{
                  marginLeft: '20px',
                  color: 'white',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                Delete
              </h3>
              <div className="secondWorkspaceRightArrow">
                <RightArrow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    if (node) {
      setCurrentNode(node);
    }
  }, [node]);

  const deterMineColor = () => {
    const flag = currentNode?.level !== 0 || currentNode?.isLeaf;
    const colourDetermined = flag
      ? 'transparent'
      : 'linear-gradient(90.28deg, rgba(138, 142, 233, 0.16) 4.88%, rgba(17, 21, 18, 0) 91.54%)';
    return colourDetermined;
  };
  const reduxState: any = useSelector((state) => state);
  const { workspace } = reduxState;
  const plusButtonClicked = (e) => {
    e.stopPropagation();
    // const { key } = node;
    // const idArray = getParentIds(treeData, key);
    // console.log(idArray);
    // // setExpandedKeys([key]);
    // setTimeout(() => {
    //   // setExpandedKeys([]);
    // }, 100);
  };
  const inputRefFolder = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    document.getElementById('newTreeChildInput')?.focus();
  }, []);
  const dispatch = useDispatch();
  const onEnterInput = (event: any) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      console.log(inputRefFolder.current.value, currentNode);
      dispatch(
        createSubChild({
          name: inputRefFolder.current.value,
          type: currentNode.isLeaf ? 'doc' : 'folder',
          parentDetails: currentNode.parent,
        })
      );
      setTimeout(setExpandedKeys([]));
      console.log(inputRefFolder.current.value, currentNode);
    }
  };
  return (
    <div
      className="eachsection"
      style={{
        position: 'relative',
        zIndex: '1',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '-30px',
        width: '238px',
        height: '36px',
        background: deterMineColor(),
        // background: 'red',
      }}
    >
      <div style={{ display: 'flex' }}>
        {currentNode?.isLeaf ? (
          <FileFilled
            style={{
              color: `${currentNode?.color}`,
              marginLeft: '30px',
              fontSize: '18px',
            }}
            rev={undefined}
          />
        ) : (
          <FolderFilled
            style={{
              color: `${currentNode?.color}`,
              marginLeft: '30px',
              fontSize: '18px',
            }}
            rev={undefined}
          />
        )}{' '}
        {!currentNode?.folderInput && !currentNode?.docInput && (
          <div style={{ display: 'flex' }}>
            <span
              style={{
                marginLeft: '10px',
                width: '150px',
                minWidth: '150px',
              }}
            >
              {currentNode?.title}
            </span>
          </div>
        )}
        {(currentNode?.folderInput || currentNode?.docInput) && (
          <div style={{ display: 'flex' }}>
            <input
              onKeyDown={onEnterInput}
              className="treeViewContainerDocInput"
              id="newTreeChildInput"
              ref={inputRefFolder}
            />
          </div>
        )}
      </div>
      {!currentNode?.isLeaf && expandedKeys.includes(node.key) && (
        <Popover trigger="hover" placement="rightTop" content={content} arrow>
          <div
            onClick={plusButtonClicked}
            style={{
              position: 'absolute',
              zIndex: '9999',
              width: '26px',
              height: '26px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '5px',
              background: ' #151517',
              borderRadius: '8px',
              left: '210px',
            }}
          >
            <PlusOutlined style={{ fontSize: '10px' }} rev={undefined} />
          </div>
        </Popover>
      )}
    </div>
  );
}

export default RenderChild;