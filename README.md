# Hướng dẫn cài đặt ứng dụng Lumi Learn
## Yêu cầu
- Nodejs 20
- MySQL
- .NET 8
## Cài đặt Backend
- Truy cập vào folder `backend`

- Trong file `appsettings.json`, ở phần `ConnectionStrings`, sửa `userid` và `password` tương ứng với MySQL trên máy
- Mở terminal và chạy các lệnh sau:

```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add Initial
dotnet ef database update
```
- Import data trong file SQL_data vào database vừa tạo

- Chạy các lệnh trong file `dotnet aws credential config.txt` trên Google Drive

- Chạy server với lệnh sau:

```bash
dotnet run
```

## Cài đặt frontend
- Truy cập thư mục frontend

- Mở terminal và chạy lệnh sau:

```bash
npm i --legacy-peer-deps
npx expo start
```