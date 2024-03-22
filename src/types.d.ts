type FileDataStatus = "scheduled" | "available" 

type CheckBoxStatus = "checked" |"unchecked" | "intermediate"

interface FileData {
  id: string
  device: string;
  name: string;
  path: string;
  status: FileDataStatus
  isChecked: boolean
}