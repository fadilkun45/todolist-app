import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

import type { ReactNode } from 'react';
import { Button } from '../ui/button';

interface ModalCustomProps {
	isOpen: boolean;
	closeModal: () => void;
	title?: string;
	description?: string;
	children?: ReactNode;
	footer?: boolean;
    className?: string;
    confirmButton?: boolean;
    onClickConfirmButton?: (parms: any) => void
}

const ModalCustom = ({ isOpen, closeModal, className,confirmButton,onClickConfirmButton,  title, description, children, footer = true }: ModalCustomProps) => {
	return (
		<Dialog open={isOpen} onOpenChange={closeModal} >
			<DialogContent className={className}>
				<DialogHeader>
					{title && <DialogTitle>{title}</DialogTitle>}
					{description && <DialogDescription>{description}</DialogDescription>}
				</DialogHeader>
				<div>{children}</div>
				<DialogFooter className="sm:justify-end">
					{footer && (
						<DialogClose className='flex'>
							<Button variant="secondary">
								Close
							</Button>
                            <Button className={`${ confirmButton ? "block": "hidden"} ml-4`} onClick={onClickConfirmButton}>
								Submit
							</Button>
						</DialogClose>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default ModalCustom;
