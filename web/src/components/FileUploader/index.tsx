import styled from 'styled-components'

type FileUploaderProps = {
  margin?: string
}

export const FileUploader = styled.input<FileUploaderProps>`
  display: block;
  margin: ${props => props.margin};
`
