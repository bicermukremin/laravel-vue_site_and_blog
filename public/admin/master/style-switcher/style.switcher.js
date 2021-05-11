var styleSwitcher = {
    initialized: !1,
    defaults: {
        saveToStorage: !0,
        preserveCookies: !1,
        colorPrimary: "#0088CC",
        colorSecondary: "#E36159",
        colorTertiary: "#2BAAB1",
        colorQuaternary: "#383f48",
        backgroundColor: "light",
        headerColor: "light",
        borderRadius: "4px",
        layoutStyle: "wide",
        sidebarColor: "dark",
        sidebarSize: "md",
        changeLogo: !0
    },
    initialize: function() {
        var r = this,
            t = $("html").data("style-switcher-options");
        this.initialized ||
            ((r.options = $.extend({}, r.defaults)),
            (String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }),
            ($.styleSwitcherCachedScript = function(o, e) {
                return (
                    (e = $.extend(e || {}, {
                        dataType: "script",
                        cache: !0,
                        url: o
                    })),
                    $.ajax(e)
                );
            }),
            null != $.cookie("borderRadius") &&
                (r.options.borderRadius = $.cookie("borderRadius")),
            null != $.cookie("colorPrimary") &&
                (r.options.colorPrimary = "#" + $.cookie("colorPrimary")),
            null != $.cookie("colorSecondary") &&
                (r.options.colorSecondary = "#" + $.cookie("colorSecondary")),
            null != $.cookie("colorTertiary") &&
                (r.options.colorTertiary = "#" + $.cookie("colorTertiary")),
            null != $.cookie("colorQuaternary") &&
                (r.options.colorQuaternary = "#" + $.cookie("colorQuaternary")),
            t &&
                ((t = t.replace(/'/g, '"')),
                (r.options = $.extend({}, r.options, JSON.parse(t))),
                (r.options.preserveCookies = !0),
                (r.options.saveToStorage = !1)),
            $("head").append(
                $('<link rel="stylesheet">').attr(
                    "href",
                    "admin/master/style-switcher/style-switcher.css"
                )
            ),
            $("head").append(
                $('<link rel="stylesheet/less">').attr(
                    "href",
                    "admin/master/less/skin.less"
                )
            ),
            $("head").append(
                $('<link rel="stylesheet/less">').attr(
                    "href",
                    "admin/master/less/extension.less"
                )
            ),
            $("head").append(
                $('<link rel="stylesheet">').attr(
                    "href",
                    "admin/master/style-switcher/bootstrap-colorpicker/css/bootstrap-colorpicker.css"
                )
            ),
            $.styleSwitcherCachedScript(
                "admin/master/style-switcher/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js"
            ).done(function(o, e) {
                (less = {
                    async: !0,
                    env: "production",
                    modifyVars: {
                        "@border-radius": r.options.borderRadius,
                        "@color-primary": r.options.colorPrimary,
                        "@color-secondary": r.options.colorSecondary,
                        "@color-tertiary": r.options.colorTertiary,
                        "@color-quaternary": r.options.colorQuaternary
                    }
                }),
                    $.styleSwitcherCachedScript("admin/master/less/less.js").done(
                        function(o, e) {
                            $.ajax({
                                url: "admin/master/style-switcher/style.switcher.html"
                            }).done(function(o) {
                                $("body").append(o),
                                    (r.container = $("#styleSwitcher")),
                                    r.build(),
                                    r.events(),
                                    t ||
                                        (null != $.cookie("layoutStyle") &&
                                            (r.options.layoutStyle = $.cookie(
                                                "layoutStyle"
                                            )),
                                        null != $.cookie("backgroundColor") &&
                                            (r.options.backgroundColor = $.cookie(
                                                "backgroundColor"
                                            )),
                                        null != $.cookie("headerColor") &&
                                            (r.options.headerColor = $.cookie(
                                                "headerColor"
                                            )),
                                        null != $.cookie("sidebarColor") &&
                                            (r.options.sidebarColor = $.cookie(
                                                "sidebarColor"
                                            )),
                                        null != $.cookie("sidebarSize") &&
                                            (r.options.sidebarSize = $.cookie(
                                                "sidebarSize"
                                            ))),
                                    r.setLayoutStyle(r.options.layoutStyle),
                                    r.setBackgroundColor(
                                        r.options.backgroundColor
                                    ),
                                    r.setHeaderColor(r.options.headerColor),
                                    r.setSidebarColor(r.options.sidebarColor),
                                    r.setSidebarSize(r.options.sidebarSize),
                                    r.setColors(),
                                    r.setBorderRadius(r.options.borderRadius),
                                    null == $.cookie("initialized") &&
                                        (r.container
                                            .find("#styleSwitcherOpen")
                                            .trigger("click"),
                                        $.cookie("initialized", !0)),
                                    (r.initialized = !0);
                            });
                        }
                    );
            }),
            $.styleSwitcherCachedScript(
                "admin/master/style-switcher/cssbeautify/cssbeautify.js"
            ).done(function(o, e) {}));
    },
    build: function() {
        var e = this,
            r = e.container.find(".color-primary input");
        (colorSecondaryField = e.container.find(".color-secondary input")),
            (colorTertiaryField = e.container.find(".color-tertiary input")),
            (colorQuaternaryField = e.container.find(
                ".color-quaternary input"
            )),
            r
                .val(e.options.colorPrimary)
                .parent()
                .colorpicker({
                    align: "right",
                    customClass: "style-switcher-color-picker"
                }),
            colorSecondaryField
                .val(e.options.colorSecondary)
                .parent()
                .colorpicker(),
            colorTertiaryField
                .val(e.options.colorTertiary)
                .parent()
                .colorpicker(),
            colorQuaternaryField
                .val(e.options.colorQuaternary)
                .parent()
                .colorpicker(),
            $(".colorpicker")
                .on("mousedown", function(o) {
                    o.preventDefault(), (e.isChanging = !0);
                })
                .on("mouseup", function(o) {
                    o.preventDefault(),
                        (e.isChanging = !1),
                        (e.options.colorPrimary = r.val()),
                        (e.options.colorSecondary = colorSecondaryField.val()),
                        (e.options.colorTertiary = colorTertiaryField.val()),
                        (e.options.colorQuaternary = colorQuaternaryField.val()),
                        e.setColors();
                }),
            $(".colorpicker-element input").on("blur", function(o) {
                (e.options.colorPrimary = r.val()),
                    (e.options.colorSecondary = colorSecondaryField.val()),
                    (e.options.colorTertiary = colorTertiaryField.val()),
                    (e.options.colorQuaternary = colorQuaternaryField.val()),
                    e.setColors();
            }),
            this.container.find(".options-links.borders a").click(function(o) {
                o.preventDefault(),
                    e.setBorderRadius($(this).attr("data-border-radius"));
            }),
            this.container
                .find(".options-links.background-color a")
                .click(function(o) {
                    o.preventDefault(),
                        e.setBackgroundColor(
                            $(this).attr("data-background-color")
                        );
                }),
            this.container
                .find(".options-links.header-color a")
                .click(function(o) {
                    o.preventDefault(),
                        e.setHeaderColor($(this).attr("data-header-color"));
                }),
            this.container
                .find(".options-links.sidebar-color a")
                .click(function(o) {
                    o.preventDefault(),
                        e.setSidebarColor($(this).attr("data-sidebar-color"));
                }),
            this.container.find(".options-links.layout a").click(function(o) {
                o.preventDefault(),
                    e.setLayoutStyle($(this).attr("data-layout-type"));
            }),
            this.container
                .find(".options-links.sidebar-size a")
                .click(function(o) {
                    o.preventDefault(),
                        e.setSidebarSize($(this).attr("data-sidebar-size"));
                }),
            e.container.find(".reset").click(function(o) {
                o.preventDefault(), e.reset();
            }),
            e.container.find(".get-css").click(function(o) {
                o.preventDefault(), e.getCss();
            });
    },
    events: function() {
        var e = this;
        $("#styleSwitcherOpen").click(function(o) {
            o.preventDefault(),
                e.container.hasClass("active")
                    ? e.container
                          .animate(
                              { right: "-" + e.container.width() + "px" },
                              300
                          )
                          .removeClass("active")
                    : e.container
                          .animate({ right: "0" }, 300)
                          .addClass("active");
        }),
            (null == $.cookie("showSwitcher") &&
                !$("body").hasClass("one-page")) ||
                ($("#styleSwitcherOpen").trigger("click"),
                $.removeCookie("showSwitcher"));
    },
    setColors: function(o, e) {
        var r = this;
        if (this.isChanging) return !1;
        o &&
            ((r.options["color" + e.capitalize()] = o),
            r.container.find(".color-" + e + " input").val(o)),
            r.options.preserveCookies ||
                ($.cookie(
                    "colorPrimary",
                    r.options.colorPrimary.replace("#", "")
                ),
                $.cookie(
                    "colorSecondary",
                    r.options.colorSecondary.replace("#", "")
                ),
                $.cookie(
                    "colorTertiary",
                    r.options.colorTertiary.replace("#", "")
                ),
                $.cookie(
                    "colorQuaternary",
                    r.options.colorQuaternary.replace("#", "")
                )),
            r.modifyVars(),
            this.setLogo();
    },
    setBorderRadius: function(o) {
        var e = this;
        (e.options.borderRadius = o),
            e.options.preserveCookies || $.cookie("borderRadius", o),
            e.modifyVars();
        var r = this.container.find(".options-links.borders");
        r.find(".active").removeClass("active"),
            r.find("a[data-border-radius=" + o + "]").addClass("active"),
            $.event.trigger({
                type: "styleSwitcher.setBorderRadius",
                radius: o
            });
    },
    setBackgroundColor: function(o) {
        this.options.preserveCookies || $.cookie("backgroundColor", o),
            this.options.saveToStorage &&
                "undefined" != typeof localStorage &&
                localStorage.setItem("backgroundColor", o);
        var e = this.container.find(".options-links.background-color");
        e.find(".active").removeClass("active"),
            e.find("a[data-background-color=" + o + "]").addClass("active"),
            "dark" == o
                ? ($("html").addClass("dark"), $("#addDarkClassInfo").show())
                : ($("html").removeClass("dark"),
                  $("#addDarkClassInfo").hide()),
            $.event.trigger({
                type: "styleSwitcher.setBackgroundColor",
                color: o
            }),
            this.setLogo();
    },
    setHeaderColor: function(o) {
        this.options.preserveCookies || $.cookie("headerColor", o),
            this.options.saveToStorage &&
                "undefined" != typeof localStorage &&
                localStorage.setItem("headerColor", o);
        var e = this.container.find(".options-links.header-color");
        e.find(".active").removeClass("active"),
            e.find("a[data-header-color=" + o + "]").addClass("active"),
            "dark" == o
                ? ($("html").addClass("header-dark"),
                  $("#addHeaderDarkClassInfo").show())
                : ($("html").removeClass("header-dark"),
                  $("#addHeaderDarkClassInfo").hide()),
            $.event.trigger({ type: "styleSwitcher.setHeaderColor", color: o });
    },
    setSidebarColor: function(o) {
        this.options.preserveCookies || $.cookie("sidebarColor", o),
            this.options.saveToStorage &&
                "undefined" != typeof localStorage &&
                localStorage.setItem("sidebarColor", o);
        var e = this.container.find(".options-links.sidebar-color");
        e.find(".active").removeClass("active"),
            e.find("a[data-sidebar-color=" + o + "]").addClass("active"),
            "light" == o
                ? ($("html").addClass("sidebar-light"),
                  $("#addSidebarLightClassInfo").show())
                : ($("html").removeClass("sidebar-light"),
                  $("#addSidebarLightClassInfo").hide()),
            $.event.trigger({
                type: "styleSwitcher.setSidebarColor",
                color: o
            });
    },
    setLayoutStyle: function(o, e) {
        if (
            (this.options.preserveCookies || $.cookie("layoutStyle", o),
            this.options.saveToStorage &&
                "undefined" != typeof localStorage &&
                localStorage.setItem("layout", o),
            e)
        )
            return $.cookie("showSwitcher", !0), window.location.reload(), !1;
        var r = this.container.find(".options-links.layout");
        r.find(".active").removeClass("active"),
            r.find("a[data-layout-type=" + o + "]").addClass("active"),
            "wide" == o
                ? ($("html").removeClass("boxed"),
                  $("#addBoxedClassInfo").hide())
                : ($("html")
                      .addClass("boxed")
                      .removeClass("fixed"),
                  $("#addBoxedClassInfo").show()),
            $.event.trigger({ type: "styleSwitcher.setLayoutStyle", style: o });
    },
    setSidebarSize: function(o) {
        var e = $("html");
        this.options.preserveCookies || $.cookie("sidebarSize", o),
            this.options.saveToStorage &&
                "undefined" != typeof localStorage &&
                localStorage.setItem("sidebarSize", o);
        var r = this.container.find(".options-links.sidebar-size");
        switch (
            (r.find(".active").removeClass("active"),
            r.find("a[data-sidebar-size=" + o + "]").addClass("active"),
            e.removeClass("sidebar-left-xs sidebar-left-sm"),
            o)
        ) {
            case "xs":
                e.addClass("sidebar-left-xs");
                break;
            case "sm":
                e.addClass("sidebar-left-sm");
        }
        $.event.trigger({ type: "styleSwitcher.setSidebarSize", color: o });
    },
    setLogo: function(o) {
        if (!this.options.changeLogo) return this;
        var e = $(".header .logo img, .center-sign .logo img");
        o ||
        (("#" + $.cookie("colorPrimary")).toUpperCase() ==
            this.defaults.colorPrimary.toUpperCase() &&
            "dark" != $.cookie("backgroundColor"))
            ? e.attr("src", "img/logo-default.png")
            : "dark" == $.cookie("backgroundColor") ||
              "dark" == $.cookie("headerColor")
            ? e.attr("src", "img/logo-light.png")
            : e.attr("src", "img/logo.png"),
            $.event.trigger({ type: "styleSwitcher.setLogo" });
    },
    modifyVars: function() {
        var o = this;
        window.clearTimeout(o.timer),
            (o.timer = window.setTimeout(function() {
                less.modifyVars({
                    "@border-radius": o.options.borderRadius,
                    "@color-primary": o.options.colorPrimary,
                    "@color-secondary": o.options.colorSecondary,
                    "@color-tertiary": o.options.colorTertiary,
                    "@color-quaternary": o.options.colorQuaternary
                }),
                    o.options.saveToStorage &&
                        "undefined" != typeof localStorage &&
                        localStorage.setItem(
                            "skin-admin.css",
                            $('style[id^="less:"]').text()
                        ),
                    $.event.trigger({
                        type: "styleSwitcher.modifyVars",
                        options: o.options
                    });
            }, 300));
    },
    reset: function() {
        $.removeCookie("borderRadius"),
            $.removeCookie("colorPrimary"),
            $.removeCookie("colorSecondary"),
            $.removeCookie("colorTertiary"),
            $.removeCookie("colorQuaternary"),
            $.removeCookie("backgroundColor"),
            $.removeCookie("headerColor"),
            $.removeCookie("layoutStyle"),
            $.removeCookie("sidebarColor"),
            $.removeCookie("sidebarSize"),
            $.cookie("showSwitcher", !0),
            window.location.reload(),
            "undefined" != typeof localStorage &&
                (localStorage.removeItem("skin-admin.css"),
                localStorage.removeItem("layout"));
    },
    getCss: function() {
        var o, e;
        $("#getCSSTextarea")
            .text($('style[id$="less-skin"]').text())
            .focus(function() {
                var o = $(this);
                o.select(),
                    o.mouseup(function() {
                        return o.unbind("mouseup"), !1;
                    });
            }),
            (o = $("#getCSSTextarea").text()),
            $("#getCSSTextarea").text(
                cssbeautify(o, { indent: "\t", autosemicolon: !0 })
            ),
            $("#getCSSTextareaExtension")
                .text($('style[id$="less-extension"]').text())
                .focus(function() {
                    var o = $(this);
                    o.select(),
                        o.mouseup(function() {
                            return o.unbind("mouseup"), !1;
                        });
                }),
            (e = $("#getCSSTextareaExtension").text()),
            $("#getCSSTextareaExtension").text(
                cssbeautify(e, { indent: "\t", autosemicolon: !0 })
            ),
            $("#getCSSModal").modal("show");
    }
};
styleSwitcher.initialize();
