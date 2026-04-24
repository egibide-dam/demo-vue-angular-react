#!make

help: _header
	${info }
	@echo Opciones:
	@echo ----------------------
	@echo demo-vue
	@echo demo-angular
	@echo demo-next
	@echo demo-router
	@echo ----------------------

_header:
	@echo ----------------------
	@echo Demo de Frameworks Web
	@echo ----------------------

demo-vue:
	@cd vue-demo && npm run dev

demo-angular:
	@cd angular-demo && npm start

demo-next:
	@cd react-next-demo   && npm run dev

demo-router:
	@cd react-router-demo && npm run dev
