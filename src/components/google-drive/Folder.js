import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Button, Overlay, Popover, ButtonGroup } from 'react-bootstrap'
import ActionButton from './ActionButton'
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons"
import { database } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import RenameModal from './RenameModal'




export default function Folder({ folder }) {
    const [showPopover, setShowPopover] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const inputRef = useRef(null)
    const target = useRef(null);
    const { currentUser } = useAuth()
    function handleRightClick(e) {
        e.preventDefault()
        setShowPopover(true)
    }
    function closePopover() {
        setShowPopover(false)
    }
    function closeModal() {
        setShowModal(false)
    }
    function handleRemove() {
        database.folders.remove(folder.id, currentUser)
        closePopover()
    }

    function openRenameModal() {
        closePopover()
        setShowModal(true)
    }
    function handleRename(e) {
        e.preventDefault()
        closeModal()
        if (folder.name !== inputRef.current.value) {
            database.folders.update(folder.id, { name: inputRef.current.value }, currentUser)
        }
    }
    return (
        <>
            <Button as={Link} to={`/folder/${folder.id}`} state={{ folder: folder }}
                variant="outline-dark" className='d-flex align-items-center' ref={target} onContextMenu={handleRightClick} style={{ gap: "8px", width: "200px" }}>
                <FontAwesomeIcon icon={faFolder} />
                <span className='text-truncate'>{folder.name}</span>
            </Button>
            <Overlay target={target.current} show={showPopover} placement="right" rootClose onHide={closePopover}>
                <Popover className="popover-shadow">
                    <ButtonGroup vertical>
                        <ActionButton icon={faTrashCan} onClick={handleRemove}>
                            Remove
                        </ActionButton>
                        <ActionButton icon={faEdit} onClick={openRenameModal}>
                            Rename
                        </ActionButton>
                    </ButtonGroup>
                </Popover>
            </Overlay>

            <RenameModal show={showModal} closeModal={closeModal} onSubmit={handleRename} defaultValue={folder.name} inputRef={inputRef} />
        </>
    )
}
