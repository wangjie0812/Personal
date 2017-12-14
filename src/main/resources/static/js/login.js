var Login = function () {
    return {
        init: function () {
        	var form = document.getElementById("form-login");
           	var validator = $(form).validate({
	            errorElement: 'label',
	            errorClass: 'help-inline',
                focusInvalid: false,
	            rules: {
	                id: {
	                    required: true
	                },
	                password: {
	                    required: true
	                }
	            },
	            messages: {
	                id: {
	                    required: "LDAP为必填项"
	                },
	                password: {
	                    required: "密码为必填项"
	                }
	            },
	            highlight: function (element) { // hightlight error inputs
	                $(element)
	                    .closest('.control-group').addClass('error'); // set error class to the control group
	            },
	            success: function (label) {
	                label.closest('.control-group').removeClass('error');
	                label.remove();
	            },
	            submitHandler: function (form) {
	                //提交登录
                    Login.ajaxSubmit(form);
	            }
	        });

	        $("input",form).keypress(function (e) {
	        	//回车键登录
	            if (e.which == 13) {
	                if (validator.form()) {
                        Login.ajaxSubmit(form);
	                }
	                return false;
	            }
	        });

	        //背景轮换
	        $.backstretch([
		        "image/bg/1.jpg",
		        "image/bg/2.jpg",
		        "image/bg/3.jpg",
		        "image/bg/4.jpg"
		        ], {
		          fade: 1000,
		          duration: 8000
		      });
        },
		ajaxSubmit:function (form) {
            var options = $(form).serialize();
            $.post("login", options, function (json) {
                if (json.code == 0) {
					window.location.href = json.data;
                } else {
                    var error = $('.alert-error', form);
                    $('span',error).text(json.msg);
                    error.show();
                }
            },'json');
        }
    };

}();