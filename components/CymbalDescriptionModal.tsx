import { Modal } from '@mantine/core'
import React from 'react'

interface CymbalsDescriptionProps {
    opened: boolean
    setOpened: any
    description: string
}
const CymbalDescriptionModal = ({ opened, setOpened, description }: CymbalsDescriptionProps) => {
    return (
        <Modal
            transition="fade"
            transitionDuration={600}
            transitionTimingFunction="ease"
            withCloseButton
            centered
            size="sm"
            opened={opened}
            onClose={() => setOpened(false)}
            title="Descripción">
            {description}
        </Modal>
    )
}

export default CymbalDescriptionModal