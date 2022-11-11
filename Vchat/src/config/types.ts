export interface dim {
    height: number,
    width: number
}

export interface AlertType {
    title: string,
    msg: string,
    onOk(): any, 
    onCancel(): any, 
    onDismiss(): any 
}