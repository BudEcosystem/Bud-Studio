import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable from 'react-draggable';
import { Spin } from 'antd';
import {
  Pin,
  Dots,
  Drag,
  SearchIcon,
  Copy,
  Delete,
  Duplicate,
  Edit,
  Move,
  Plus,
  RightArrow,
} from './WorkspaceIcons';
import { duplicateWorkspaceItem, createWorkspaces, editWorkspaceItem } from 'redux/slices/workspace';
import TreeView from './TreeView/TreeView';
import './WorkspaceModal.css';

const WorkspaceModal = ({ idx, name, setWorkspaceModal, workspaceModal }: any) => {
  const [showColorPin, setShowColorPin] = useState(false);
  const [showColorDots, setShowColorDots] = useState(false);
  const [render, setRender] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [isRename, setIsRename] = useState(false)
  const [newName, setNewName] = useState("");
  const dispatch = useDispatch();
  const { workspace }: any = useSelector((state) => state);
  let { color, workSpaceItems } = workspace;

  useEffect(() => {
    if (workspaceModal) {
      setTimeout(() => {
        setRender(true);
      }, 100);
    } else {
      setRender(false);
    }
  }, [workspaceModal]);
  const wrapperRef = useRef(null);
  const optionModalRef = useRef(null);

  function useOutsideAlerter(ref: any, optionRef: any) {
    const [isDrag, setIsDrag] = useState(true);

    useEffect(() => {
      function handleClickOutside(event: any) {
        if (showColorDots) {
          if (
            optionRef.current &&
            !optionRef.current.contains(event.target) &&
            ref.current &&
            !ref.current.contains(event.target)
          ) {
            setShowColorDots(false);
          }
        } else if (
          ref.current &&
          !ref.current.contains(event.target) &&
          isDrag
        ) {
          setWorkspaceModal(false);
          setIsDrag(false);
        } else {
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, isDrag, setWorkspaceModal, showColorDots]);

    function handleIsDrag() {
      setIsDrag(!isDrag);
    }

    return { isDrag, handleIsDrag };
  }

  const { isDrag, handleIsDrag } = useOutsideAlerter(
    wrapperRef,
    optionModalRef
  );

  const loaderStyle = {
    "--loaderColor": color
  }
  const duplicateHandler = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      dispatch(createWorkspaces({name: `${workSpaceItems[idx].name}[copy]`, color, idx}))
    }, 2000);
    // console.log("clicked duplicate")
  }

  const renameHandler = () => {
    setIsRename(!isRename)
  }

  const workSpaceNameInputHandler = (e: any) => {
    setNewName((prev: any) => {
      console.log(prev)
      return e.target.value
    });
  };

  const workSpaceNameChangeHandler = (e: any) => {
    if (e.key === 'Enter' && !!e.target.value) {
      dispatch(editWorkspaceItem({index:idx, value: newName}))
      setIsRename(false)
      // console.log(workSpaceItems)
      setNewName("")
    }
  };

  return (
   <>
   <div className='loader' style={loaderStyle}>
    {isLoading && <Spin size="large"/>}
   </div>
    <div
      className="box"
      style={{
        position: 'absolute',
        top: '0',
        right: '0',
        height: '100%',
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      <Draggable bounds="parent" handle=".handle">
        <div
          className={`WorkspaceModal ${render ? 'show' : undefined}`}
          ref={wrapperRef}
        >
          <div className="WorkspaceModalTop">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isDrag ? (
                <div className="handle">
                  <Drag />
                </div>
              ) : (
                <div style={{ visibility: 'hidden' }}>
                  <Drag />
                </div>
              )}
              <div
                style={{
                  backgroundColor: `${color}`,
                  width: '12px',
                  height: '12px',
                  borderRadius: '4px',
                  marginRight: '10px',
                  marginLeft: '10px',
                }}
              />
              <div
                style={{
                  width: '120px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: '#C6C6C6',
                  fontWeight: '400',
                  fontSize: '14px',
                }}
              >
                {workSpaceItems[idx].name}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                onClick={() => {
                  setShowColorPin(!showColorPin);
                }}
                style={{
                  marginRight: '6px',
                  background: `${
                    showColorPin
                      ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)`
                      : ''
                  }`,
                }}
                className="WorkspaceIconBox"
              >
                <div className="WorkspaceIcon" onClick={handleIsDrag}>
                  <Pin />
                </div>
              </div>

              <div
                onClick={() => {
                  setShowColorDots(!showColorDots);
                }}
                style={{
                  background: `${
                    showColorDots
                      ? `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, ${color} 57.81%, rgba(175, 147, 218, 0.05) 100%)`
                      : ''
                  }`,
                }}
                className="WorkspaceIconBox"
              >
                <div className="WorkspaceIcon">
                  <Dots />
                </div>
              </div>
            </div>
          </div>

          <div className="WorkspaceSearchBar">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '15px',
              }}
            >
              <SearchIcon />
            </div>
            <input
              className="WorkspaceSearchInput"
              type="text"
              placeholder="Search"
            />
          </div>

          <TreeView idx={idx}/>
        </div>
      </Draggable>
      {showColorDots && (
        <Draggable bounds="parent" handle=".drag">
          <div ref={optionModalRef} className="optionsModal">
            <div className="secondWorkspaceModal">
              <div className="drag">
                <Drag />
              </div>

              <div className="secondWorkspaceOptions">
                <div style={{ marginBottom: '20px' }}>
                  <div className="secondWorkspaceOption">
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
                    <div className="secondWorkspaceRightArrow">
                      <RightArrow />
                    </div>
                  </div>
                  <div className="secondWorkspaceOption" onClick={renameHandler}>
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
                  <div>
                    {isRename && <input type='text' value={newName}  onKeyUp={workSpaceNameChangeHandler} onInput={workSpaceNameInputHandler} />}
                  </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div className="secondWorkspaceOption" onClick={duplicateHandler}>
                    <Duplicate />
                    <h3
                      style={{
                        marginLeft: '20px',
                        color: 'white',
                        fontWeight: '400',
                        fontSize: '14px',
                      }}
                    >
                      Duplicate Space
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
        </Draggable>
      )}
    </div>
   </>
  );
};

export default WorkspaceModal;
