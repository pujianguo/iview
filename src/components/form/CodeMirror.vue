<template>
  <div name="codemirror">
    <Card :bordered="false" dis-hover style="margin-bottom: 20px;">
      <codemirror v-model="content" :options="editorOption"></codemirror>
    </Card>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'

require('codemirror/keymap/sublime.js')

// 全屏显示需要引入的文件
require('codemirror/addon/display/fullscreen.css')
require('codemirror/addon/display/fullscreen.js')

export default {
  components: {
    codemirror
  },
  data () {
    return {
      content: content,
      editorOption: {
        tabSize: 2,
        styleActiveLine: true,
        line: true,
        mode: 'text/x-nginx-conf',
        lineNumbers: true,  // 显示行号
        theme: 'solarized',  // 设置主题
        keyMap: 'sublime',  // 绑定sublime
        fullScreen: false,  // 全屏模式
        matchBrackets: true,  // 括号匹配
        indentWithTabs: true,
        readOnly: false
      }
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  }
}

let content = `user  www www;
worker_processes auto;
worker_rlimit_nofile 65535;
worker_cpu_affinity auto;
### delete for test
### delete for test
### delete for test

events {
    use epoll;
    worker_connections  65535;
    reuse_port on;
  ###addd line
    accept_mutex off;

}

http {
  server_tokens off;
  server_tag Sina;
  include       {{.ProjectConfDir}}/tengine.mime.types;
  default_type  application/octet-stream;

    log_format dpool_log  '{"@timestamp":"$time_iso8601",'
        '"@version":"1",'
        '"client_ip":"$remote_addr",'
        '"remote_user":"$remote_user",'
        '"domain":"$http_host",'
        '"user_agent":"$http_user_agent",'
        '"upstream_addr":"$upstream_addr",'
        '"upstream_response_time":"$upstream_response_time",'
        '"request_uri":"$request_uri",'
        '"pool":"$dpool",'
        '"request_time":"$request_time",'
        '"size":"$body_bytes_sent",'
        '"http_referer":"$http_referer",'
        '"status":"$status",'
        '"upstream_status":"$upstream_status",'
        '"host":"$hostname"}';

  keepalive_timeout 0;
  lingering_timeout 50ms;

  underscores_in_headers on;
  proxy_buffering off;
    proxy_buffer_size 128k;
    proxy_buffers 32 32k;
    proxy_busy_buffers_size 128k;

  proxy_connect_timeout 120s;
  proxy_send_timeout 120s;
  proxy_read_timeout 120s;
  proxy_http_version 1.1;
    proxy_intercept_errors on;
  proxy_ignore_client_abort on;

    client_max_body_size 8m;
  server_names_hash_max_size 1024;
  server_names_hash_bucket_size 512;
    client_header_buffer_size 1k;
    large_client_header_buffers 8 8k;
  req_status_zone counter "$host" 30M;
    map $geo_location $weibo_black_uid_policy_arg {
        default "G0";
    }
    geo $http_x_forwarded_for $geo_location {
        ranges;
        default UNKNOWN;
    }
    map $http_x_proto $x_forwarded_for {
        default $remote_addr;
        ~*SSL $http_x_forwarded_for;
    }

  check_shm_size 5m;
  ################################################################
  # security agent
    lua_shared_dict banned 16m ;
    lua_shared_dict agent_locks 1m;
    lua_package_cpath "/usr/local/sinasrv5/lib/lua/5.1/?.so;;";
    lua_package_path "/usr/local/sinasrv5/etc/lua/agent/?.lua;;";
    init_worker_by_lua_file "etc/lua/agent/init-agent.lua";

  vhost_traffic_status_zone;
    include conf.d/*.conf;
}`
</script>

<style scoped>
.CodeMirror {
  height: 360px;
}
.CodeMirror-fullscreen {
  z-index: 9999;
}
</style>
