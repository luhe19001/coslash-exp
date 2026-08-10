# Issue and Risk Register

Only the master agent edits this file. Keep only active or explicitly controlled items; remove resolved items after their fix commit is recorded.

| ID    | Severity | Found by task | Area          | Description                                                                   | Owner  | Status     | Resolution/evidence                         |
| ----- | -------- | ------------- | ------------- | ----------------------------------------------------------------------------- | ------ | ---------- | ------------------------------------------- |
| I-006 | low      | 14            | Persistence   | Atlas compound board-CAS and transition-validation locks coordinate one process, not two collectors sharing one root. | 18/master | controlled | Supported topology has one collector owner per root; result `5159f52` coordinates all store instances within that process and reclaims locks. |
