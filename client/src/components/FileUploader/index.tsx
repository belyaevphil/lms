import { FC, HTMLAttributes } from 'react'
import { useDropzone } from 'react-dropzone'

import c from './style.module.scss'

export type FileUploaderProps = HTMLAttributes<HTMLDivElement>

export const FileUploader: FC<FileUploaderProps> = ({ ...rest }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    maxFiles: 3
  })

  const files = acceptedFiles.map(file => (
    <li key={`${file.name}${file.size}`}>&#8618; {file.name}</li>
  ))

  return (
    <div className={c.dropzoneContainer} {...rest}>
      <div className={c.dropzone} {...getRootProps()}>
        <input type='file' name='files' {...getInputProps()} />
        <p className={c.actionText}>Перетащите файлы сюда или кликните, чтобы выбрать файлы</p>
      </div>
      <div className={c.attachedFilesContainer}>
        Приложенные файлы:
        <ul className={c.attachedFiles}>{files}</ul>
      </div>
    </div>
  )
}
