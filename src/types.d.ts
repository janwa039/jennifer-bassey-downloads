type FileDataStatus = "scheduled" | "available" 

type CheckBoxStatus = "checked" |"unchecked" | "intermediate"

interface FileData {
  device: string;
  name: string;
  path: string;
  status: FileDataStatus
}

interface FileDataState extends FileData {
  id: string
  isChecked: boolean
}